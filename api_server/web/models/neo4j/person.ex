defmodule ApiServer.Models.Neo4j.Person do

  alias Neo4j.Sips, as: Neo4j
  alias ApiServer.Models.Postgres.Person, as: PgPerson

  @enforce_keys [:id]
  defstruct [:id, :person_id]

  @spec insert_person(PgPerson, bool) :: ApiServer.Models.Neo4j.Person
  @spec find_node_from_person_id(integer, pid) :: ApiServer.Models.Neo4j.Person


  @doc """
  Insert a new person into neo4j using the pg_person model, return the inserted person
  """
  def insert_person(pg_person, is_root \\ false) do
    %{id: person_id} = pg_person
    query = """
    CREATE (person:Person {person_id: #{person_id}, is_root: #{is_root}})
    RETURN person, id(person) AS id
    """
    [%{"person" => neo_person, "id" => id}] = Neo4j.query!(Neo4j.conn, query)

    neo_person
    |> Map.put("id", id)
    |> ApiServer.Util.to_atom_map()
  end


  @doc """
  Find the node from the person id
  """
  def find_node_from_person_id(person_id, log_trace) do
    query = """
    MATCH (person:Person {person_id: #{person_id}})
    RETURN person, id(person) AS id
    """
    [%{"person" => %{"person_id" => person_id}, "id" => id}] = Neo4j.query!(Neo4j.conn, query)

    %ApiServer.Models.Neo4j.Person{
      id: id,
      person_id: person_id
    }
  end
end
