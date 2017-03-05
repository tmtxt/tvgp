defmodule ApiServer.SeedData.Person do

  alias ApiServer.Models.Neo4j.Person, as: NeoPerson
  alias ApiServer.Models.Neo4j.PedigreeRelation, as: PedigreeRelation
  alias ApiServer.Models.Postgres.Person
  alias ApiServer.LogTrace.Core, as: LogTrace
  alias ApiServer.Repo

  def seed_person_data(log_trace) do
    root_node = insert_root(log_trace)
    wife_node = insert_root_wife(log_trace)

    PedigreeRelation.link_people(root_node, wife_node)
  end

  defp insert_root(log_trace) do
    # insert to postgres
    pg_data = Person.changeset(
      %Person{}, %{
        full_name: "Root",
        gender: "male",
        alive_status: "dead"
      }
    )
    pg_person = Repo.insert! pg_data
    LogTrace.add(log_trace, :info, "insert_person", "Root person inserted to postgres")

    # insert to neo4j
    res = NeoPerson.insert_person(pg_person, true)
    LogTrace.add(log_trace, :info, "insert_person", "Root person inserted to neo4j")
    LogTrace.add(log_trace, :info, "insert_person", res)

    res
  end


  defp insert_root_wife(log_trace) do
    # insert to postgres
    pg_data = Person.changeset(
      %Person{}, %{
        full_name: "Root wife",
        gender: "female",
        alive_status: "dead"
      }
    )
    pg_person = Repo.insert! pg_data
    LogTrace.add(log_trace, :info, "insert_person", "Root wife inserted to postgres")

    # insert to neo4j
    res = NeoPerson.insert_person(pg_person, false)
    LogTrace.add(log_trace, :info, "insert_person", "Root wife inserted to neo4j")

    res
  end
end
