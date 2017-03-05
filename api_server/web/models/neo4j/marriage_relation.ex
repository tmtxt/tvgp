defmodule ApiServer.Models.Neo4j.MarriageRelation do

  alias Neo4j.Sips, as: Neo4j

  @doc """
  Link two person node
  """
  def link_people(husband_node, wife_node) do
    %{id: husband_node_id} = husband_node
    %{id: wife_node_id} = wife_node

    Task.yield_many([
      link_husband_wife_async(husband_node_id, wife_node_id),
      link_wife_husband_async(wife_node_id, husband_node_id)
    ])
  end


  defp link_husband_wife_async(husband_node_id, wife_node_id) do
    query = """
    MATCH (husband) WHERE id(husband) = #{husband_node_id}
    MATCH (wife) WHERE id(wife) = #{wife_node_id}
    CREATE (husband)-[husband_wife:Husband_wife]->(wife)
    RETURN husband_wife
    """

    Task.async(fn ->
      Neo4j.query!(Neo4j.conn, query)
    end)
  end

  defp link_wife_husband_async(wife_node_id, husband_node_id) do
    query = """
    MATCH (wife) WHERE id(wife) = #{wife_node_id}
    MATCH (husband) WHERE id(husband) = #{husband_node_id}
    CREATE (wife)-[wife_husband:Wife_husband]->(husband)
    RETURN wife_husband
    """

    Task.async(fn ->
      Neo4j.query!(Neo4j.conn, query)
    end)
  end

end
