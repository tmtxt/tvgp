defmodule ApiServer.Models.Neo4j.Person do

  alias Neo4j.Sips, as: Neo4j
  alias ApiServer.Models.Postgres.Person, as: PgPerson

  @spec insert_person(PgPerson, bool) :: ApiServer.Models.Neo4j.Person


  @doc """
  Insert a new person into neo4j using the pg_person model, return the inserted person
  """
  def insert_person(pg_person, is_root \\ false) do
    %{id: person_id} = pg_person
    query = """
    CREATE (person:Person {person_id: \"#{person_id}\", is_root: #{is_root}})
    RETURN person, id(person) AS id
    """
    [%{"person" => neo_person, "id" => id}] = Neo4j.query!(Neo4j.conn, query)

    neo_person = neo_person
    |> Map.put("id", id)
    |> ApiServer.Util.to_atom_map()
  end

end
