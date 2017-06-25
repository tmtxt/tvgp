defmodule ApiServer.Services.Tree do
  alias ApiServer.Models.Neo4j.Person, as: NeoPerson
  alias ApiServer.Models.Postgres.Person, as: PgPerson
  alias ApiServer.Models.Neo4j.Tree
  alias ApiServer.Models.Neo4j.MarriageRelation
  alias ApiServer.LogTrace.Core, as: LogTrace


  def get_tree(log_trace) do
    %{person_id: person_id} = NeoPerson.find_root_node(log_trace)
    get_tree(person_id, log_trace)
  end

  def get_tree(from_person_id, log_trace) do
    LogTrace.add(log_trace, :info, "get_tree", "Root person id #{from_person_id}")

    # find the root node from neo4j
    root_node = NeoPerson.find_node_from_person_id(from_person_id, log_trace)
    %{id: root_node_id} = root_node
    LogTrace.add(log_trace, :info, "get_tree", "Root node id #{root_node_id}")

    # construct the root node (the starting of the tree) and query the tree structure from neo4j
    res = Task.yield_many([
      Task.async(fn -> find_root_with_info(root_node, log_trace) end),
      Task.async(fn -> Tree.get_neo_tree_from_node_id(root_node_id, log_trace) end)
    ])
    [{_, {:ok, root_tree}}, {_, {:ok, neo_tree}}] = res

    # assign the initial path into the root tree
    root_tree = Map.put(root_tree, :path, [root_node_id])

    # find all the person entities that exist in the tree
    person_entities = find_persons_from_neo_tree(neo_tree)

    # construct the tree with the root info is the starting tree
    tree = construct_tree(root_tree, neo_tree, person_entities)

    convert_tree_to_children_list(tree)
  end


  # convert the tree (from construct_tree) with children is a map to children is a list
  defp convert_tree_to_children_list(root_node) when root_node == %{} do
    []
  end

  defp convert_tree_to_children_list(root_node) do
    Map.update!(root_node, :children, fn(children) ->
      children
      |> Enum.map(fn({_, child}) ->
        convert_tree_to_children_list(child)
      end)
    end)
  end

  # recursion function for constructing the tree
  # return the tree structure like this
  # %{
  #   node: neo4j_node,
  #   info: pg_entity,
  #   marriages: [pg_entity],
  #   children: %{
  #     "#{person_id}": recur_tree_object
  #   }
  # }
  defp construct_tree(tree, [], _person_entities) do
    tree
  end

  # recursion function
  defp construct_tree(tree, [current_node|remaining_nodes], person_entities) do
    %{"path" => path} = current_node
    person_id = List.last(path)
    marriages = current_node
    |> Map.get("marriage")
    |> Enum.map(fn(person_id) ->
      Map.get(person_entities, person_id)
    end)
    current_tree_node = %{
      info: Map.get(person_entities, person_id),
      children: %{},
      marriages: marriages,
      path: path
    }
    keys = path_to_keys(path)
    tree = put_in(tree, keys, current_tree_node)

    construct_tree(tree, remaining_nodes, person_entities)
  end


  # Util function, convert a path to the keys to set in the nested structure
  # Input [120, 140, 150, 160]
  # Return [:children, "140", :children, "150", :children, "160"]
  defp path_to_keys(path) do
    # omit the first id in the path (already the root id)
    [_ | path] = path

    path
    |> Enum.map(fn(id) -> [:children, "#{id}"] end)
    |> Enum.concat()
  end


  # Find all the person entities from the tree return from the query in "get_neo_tree_from_node_id"
  # Return a map, key is the person id, value is the person entity
  defp find_persons_from_neo_tree(neo_tree) do
    # extract the person_ids from the neo_tree
    person_ids = neo_tree
    |> Enum.map(fn(node) ->
      person_id = node
      |> Map.get("path")
      |> List.last()
      [person_id | Map.get(node, "marriage", [])]
    end)
    |> Enum.concat()

    # call to model to load all person entities
    persons = PgPerson.get_by_ids(person_ids)

    # convert the result into a map with key is person id, value is the person entity
    Enum.reduce(persons, %{}, fn(person, res) -> Map.put(res, Map.get(person, :id), person) end)
  end

  # Construct the root node in the tree (this is actually the tree object, without the children)
  # Return
  # %{
  #   info: the person entity,
  #   marriages: the list of all person entities that get married to this person,
  #   children: empty maps
  # }
  defp find_root_with_info(root_node, _log_trace) do
    %{ person_id: person_id, id: node_id } = root_node
    [{_, {:ok, person_info}}, {_, {:ok, marriage_nodes}}] = Task.yield_many([
      Task.async(fn -> PgPerson.get_by_id(person_id) end),
      Task.async(fn -> MarriageRelation.find_marriages_from_node_id(node_id) end)
    ])

    marriages = marriage_nodes
    |> Enum.map(fn(%NeoPerson{person_id: person_id}) -> person_id end)
    |> PgPerson.get_by_ids()

    %{
      node: root_node,
      info: person_info,
      marriages: marriages,
      children: %{}
    }
  end

end
