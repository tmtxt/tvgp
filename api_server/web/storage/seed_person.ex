defmodule ApiServer.SeedData.Person do

  alias ApiServer.Models.Neo4j.Person, as: NeoPerson
  alias ApiServer.Models.Postgres.Person
  alias ApiServer.LogTrace.Core, as: LogTrace
  alias ApiServer.Repo

  def seed_person_data(log_trace) do
    root_node = insert_root(log_trace)
  end

  defp insert_root(log_trace) do
    # insert to postgres
    pg_data = Person.changeset(
      %Person{}, %{
        full_name: "Tommy",
        gender: "male",
        alive_status: "dead"
      }
    )
    pg_person = Repo.insert! pg_data
    LogTrace.add(log_trace, :info, "insert_person", "Root person inserted to postgres")

    # insert to neo4j
    res = NeoPerson.insert_person(pg_person, true)
    LogTrace.add(log_trace, :info, "insert_person", "Root person inserted to neo4j")

    res
  end
end
