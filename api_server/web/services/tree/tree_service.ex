defmodule ApiServer.Services.Tree do
  alias ApiServer.Models.Neo4j.Person, as: NeoPerson
  alias ApiServer.Models.Postgres.Person, as: PgPerson
  alias Neo4j.Sips, as: Neo4j

  def get_tree(from_person_id, log_trace) do
    root_node = NeoPerson.find_node_from_person_id(from_person_id, log_trace)
    %{id: root_node_id} = root_node

    res = Task.yield_many([
      Task.async(fn -> find_root_with_info(root_node, log_trace) end),
      Task.async(fn -> get_neo_tree_from_node_id(root_node_id, log_trace) end)
    ])
    [{_, {:ok, root_tree}}, {_, {:ok, neo_tree}}] = res
    [root_tree, neo_tree]
  end

  # Construct the root node in the tree (this is actually the tree object, without the children)
  defp find_root_with_info(root_node, log_trace) do
    %{ person_id: person_id } = root_node
    person_info = PgPerson.get_by_id(person_id)

    %{
      node: root_node,
      info: person_info,
      marriages: [],
      children: []
    }
  end

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
