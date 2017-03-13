defmodule ApiServer.Models.Neo4j.Tree do

  alias Neo4j.Sips, as: Neo4j

  @doc """
  Query the tree data from the root_node_id in neo4j
  Return a list like this, ordered by length "path". The least path stays first.
  Each node in the list represent one person in the tree
  path: path from root node to this node
  marrage: list of all person ids get married with this person
  [
    {
      "path": [
        118,
        119
      ],
      "marriage": [],
      "depth": 1
    },
    {
      "path": [
        118,
        119,
        120
      ],
      "marriage": [121],
      "depth": 2
    }
  ]
  """
  def get_neo_tree_from_node_id(root_node_id, _log_trace) do
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
