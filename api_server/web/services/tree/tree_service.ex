defmodule ApiServer.Services.Tree do
  alias ApiServer.Models.Neo4j.Person, as: NeoPerson
  alias ApiServer.Models.Postgres.Person, as: PgPerson
  alias Neo4j.Sips, as: Neo4j

  def get_tree(from_person_id, log_trace) do
    root_node = NeoPerson.find_node_from_person_id(from_person_id, log_trace)
    %{id: root_node_id} = root_node

    # construct the root node (the starting of the tree) and query the tree structure from neo4j
    res = Task.yield_many([
      Task.async(fn -> find_root_with_info(root_node, log_trace) end),
      Task.async(fn -> get_neo_tree_from_node_id(root_node_id, log_trace) end)
    ])
    [{_, {:ok, root_tree}}, {_, {:ok, neo_tree}}] = res

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
  defp construct_tree(tree, [], person_entities) do
    tree
  end

  # recursion function
  defp construct_tree(tree, [current_node|remaining_nodes], person_entities) do
    %{"path" => path} = current_node
    person_id = List.last(path)
    current_tree_node = %{
      info: Map.get(person_entities, person_id),
      children: %{},
      marriages: []
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
    person_ids = Enum.map(
      neo_tree,
      fn(node) ->
        node
        |> Map.get("path")
        |> List.last()
      end
    )

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
  defp find_root_with_info(root_node, log_trace) do
    %{ person_id: person_id } = root_node
    person_info = PgPerson.get_by_id(person_id)

    %{
      node: root_node,
      info: person_info,
      marriages: [],
      children: %{}
    }
  end


  # Query the tree data from the root_node_id in neo4j
  # Return a list like this, ordered by length "path". The least path stays first.
  # Each node in the list represent one person in the tree
  # path: path from root node to this node
  # marrage: list of all person ids get married with this person
  # [
  #   {
  #     "path": [
  #       118,
  #       119
  #     ],
  #     "marriage": [],
  #     "depth": 1
  #   },
  #   {
  #     "path": [
  #       118,
  #       119,
  #       120
  #     ],
  #     "marriage": [121],
  #     "depth": 2
  #   }
  # ]
  defp get_neo_tree_from_node_id(root_node_id, log_trace) do
    query = """
    MATCH p=(root:Person)-[:Father_child|Mother_child *1..5]->(child:Person)
    WHERE id(root) = #{root_node_id}
    WITH nodes(p) AS all_nodes,
    relationships(p) AS all_relationships,
    length(p) AS depth,
    extract(n IN (child)-[:Husband_wife|Wife_husband]->(:Person) | last(nodes(n)).person_id) AS marriage
    RETURN extract(n IN all_nodes | n.person_id) AS `path`,
    depth AS `depth`,
    marriage AS `marriage`,
    last(extract(r IN all_relationships | r.`order`)) AS `last_order`,
    extract(n IN all_nodes | n.person_id)[-2] AS `last_parent`
    ORDER BY `depth`, `last_parent`, `last_order`;
    """
    Neo4j.query!(Neo4j.conn, query)
  end

end
