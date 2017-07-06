defmodule ApiServer.Models.Neo4j.MarriageRelation do

  alias Neo4j.Sips, as: Neo4j

  alias ApiServer.Util
  alias ApiServer.Models.Neo4j.Person, as: NeoPerson

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

  def find_marriages_from_person_id(person_id) do
    query = """
    MATCH (p:Person {person_id: #{person_id}})-[:Husband_wife|Wife_husband]->(m:Person)
    RETURN m AS `node`
    """

    Neo4j.query!(Neo4j.conn, query)
  end

  @doc """
  Find all person nodes that get married with this person
  Return a List of all marriage NeoPerson
  """
  def find_marriages_from_node_id(person_node_id) do
    query = """
    MATCH (person)-[:Husband_wife|Wife_husband]->(marriage)
    WHERE id(person) = #{person_node_id}
    RETURN marriage, id(marriage) AS id
    """

    Neo4j.query!(Neo4j.conn, query)
    |> Enum.map(fn(%{"marriage" => neo_person, "id" => id}) ->
      neo_person
      |> Map.put("id", id)
      |> Util.to_atom_map()
      Util.to_struct(%NeoPerson{id: id}, neo_person)
    end)
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
