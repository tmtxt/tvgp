defmodule ApiServer.Test.Services.Tree.GetTreeTest do
  use ApiServer.ConnCase, async: false

  alias ApiServer.Models.Postgres.Person, as: PgPerson
  alias ApiServer.Models.Neo4j.Person, as: NeoPerson
  alias ApiServer.Models.Neo4j.MarriageRelation, as: MarriageRelation
  alias ApiServer.Models.Neo4j.PedigreeRelation, as: PedigreeRelation

  alias ApiServer.LogTrace.Core, as: LogTrace
  alias ApiServer.Services.Tree, as: TreeService
  alias Plug.Conn
  alias Neo4j.Sips, as: Neo4j


  # log trace for each test
  setup context do
    log_trace = LogTrace.create_no_link()
    LogTrace.add(log_trace, :info, "Setup()", context[:test])
    { root_person_id, wife_person_id, child_person_id } = insert_sample_person()
    LogTrace.add(log_trace, :info, "Setup()", "Sample data inserted")

    on_exit fn ->
      delete_sample_person()
      LogTrace.add(log_trace, :info, "Setup()", "Sample data cleared")
      LogTrace.stop(log_trace)
    end

    [
      log_trace: log_trace,
      root_person_id: root_person_id,
      wife_person_id: wife_person_id,
      child_person_id: child_person_id
    ]
  end


  test "Get tree data from default root", context do
    log_trace = context[:log_trace]
    root_person_id = context[:root_person_id]

    res = TreeService.get_tree(root_person_id, log_trace)
    LogTrace.add(log_trace, :info, "Get tree data", res)
  end


  defp insert_sample_person() do
    # insert 3 persons to postgres and neo4j
    root = PgPerson.insert(%{full_name: "Root husband"})
    wife = PgPerson.insert(%{full_name: "Root wife"})
    child = PgPerson.insert(%{full_name: "Child"})
    root_node = NeoPerson.insert_person(root, true)
    wife_node = NeoPerson.insert_person(wife)
    child_node = NeoPerson.insert_person(wife)

    # link relationship
    MarriageRelation.link_people(root_node, wife_node)
    PedigreeRelation.link_family(root_node, wife_node, child_node)

    {Map.get(root, :id), Map.get(wife, :id), Map.get(child, :id)}
  end

  defp delete_sample_person() do
    # delete person in postgres
    PgPerson.delete_all

    # delete everything in neo4j
    query = """
    MATCH (n)-[r]->(p) DELETE n, r, p
    """
    Neo4j.query!(Neo4j.conn, query)
  end
end
