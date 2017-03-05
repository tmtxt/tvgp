defmodule ApiServer.Models.Neo4j.PedigreeRelation do

  alias Neo4j.Sips, as: Neo4j

  @doc """
  Link two person node
  """
  def link_people(husband_node, wife_node) do
    %{id: husband_node_id} = husband_node
    %{id: wife_node_id} = wife_node

    query = """
    MATCH (husband) WHERE id(husband) = #{husband_node_id}
    MATCH (wife) WHERE id(wife) = #{wife_node_id}
    CREATE (husband)-[husband_wife:Husband_wife]->(wife)
    RETURN husband_wife
    """
    Neo4j.query!(Neo4j.conn, query)
  end

end
