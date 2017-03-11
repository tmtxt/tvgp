defmodule ApiServer.Test.Services.Tree.GetTreeTest do
  use ApiServer.ConnCase, async: false

  alias ApiServer.Models.Postgres.Person, as: PgPerson
  alias ApiServer.Models.Neo4j.Person, as: NeoPerson
  alias ApiServer.Models.Neo4j.MarriageRelation, as: MarriageRelation
  alias ApiServer.Models.Neo4j.PedigreeRelation, as: PedigreeRelation

  alias ApiServer.LogTrace.Core, as: LogTrace
  alias ApiServer.Services.Tree, as: TreeService
  alias Neo4j.Sips, as: Neo4j


  # log trace for each test
  setup context do
    log_trace = LogTrace.create_no_link()
    LogTrace.add(log_trace, :info, "Setup()", context[:test])
    data = insert_sample_person()
    LogTrace.add(log_trace, :info, "Setup()", "Sample data inserted")

    on_exit fn ->
      delete_sample_person()
      LogTrace.add(log_trace, :info, "Setup()", "Sample data cleared")
      LogTrace.stop(log_trace)
    end

    Enum.concat(data, [log_trace: log_trace])
  end


  test "Get tree data from custom root", context do
    log_trace = context[:log_trace]
    root_person_id = context[:root_person_id]

    tree = TreeService.get_tree(root_person_id, log_trace)
    # LogTrace.add(log_trace, :info, "Get tree data", tree)

    assert_tree(tree)
  end


  test "Get tree data from default root", context do
    log_trace = context[:log_trace]

    tree = TreeService.get_tree(log_trace)
    # LogTrace.add(log_trace, :info, "Get tree data", tree)

    assert_tree(tree)
  end


  defp assert_tree(tree) do
    # root
    %{
      info: %{ full_name: "Root husband" },
      marriages: [%{ full_name: "Root wife" }],
      children: f1_children
    } = tree

    # f1 - 1
    f1_husband1_child = Enum.find(
      f1_children,
      fn(child) ->
        %{ info: %{ full_name: full_name }} = child
        full_name == "F1 Husband 1"
      end
    )
    %{
      marriages: [%{ full_name: "F1 Wife 1" }],
      children: f2_children
    } = f1_husband1_child

    # f1 - 2
    f1_husband2_child = Enum.find(
      f1_children,
      fn(child) ->
        %{ info: %{ full_name: full_name }} = child
        full_name == "F1 Husband 2"
      end
    )
    %{
      marriages: [%{ full_name: "F1 Wife 2" }],
      children: []
    } = f1_husband2_child

    # f2
    [%{
        info: %{ full_name: "F2 Husband 1" },
        marriages: [],
        children: []
     }] = f2_children
  end


  # Insert sample data
  defp insert_sample_person() do
    root_husband = PgPerson.insert(%{full_name: "Root husband"})
    root_wife = PgPerson.insert(%{full_name: "Root wife"})
    root_husband_node = NeoPerson.insert_person(root_husband, true)
    root_wife_node = NeoPerson.insert_person(root_wife)

    f1_husband1 = PgPerson.insert(%{full_name: "F1 Husband 1"})
    f1_wife1 = PgPerson.insert(%{full_name: "F1 Wife 1"})
    f1_husband1_node = NeoPerson.insert_person(f1_husband1)
    f1_wife1_node = NeoPerson.insert_person(f1_wife1)

    f1_husband2 = PgPerson.insert(%{full_name: "F1 Husband 2"})
    f1_wife2 = PgPerson.insert(%{full_name: "F1 Wife 2"})
    f1_husband2_node = NeoPerson.insert_person(f1_husband2)
    f1_wife2_node = NeoPerson.insert_person(f1_wife2)

    f2_husband1 = PgPerson.insert(%{full_name: "F2 Husband 1"})
    f2_husband1_node = NeoPerson.insert_person(f2_husband1)

    # link relationship
    MarriageRelation.link_people(root_husband_node, root_wife_node)
    MarriageRelation.link_people(f1_husband1_node, f1_wife1_node)
    MarriageRelation.link_people(f1_husband2_node, f1_wife2_node)

    PedigreeRelation.link_family(root_husband_node, root_wife_node, f1_husband1_node)
    PedigreeRelation.link_family(root_husband_node, root_wife_node, f1_husband2_node)
    PedigreeRelation.link_family(f1_husband1_node, f1_wife1_node, f2_husband1_node)

    [
      root_person_id: Map.get(root_husband, :id),
      root_husband: root_husband,
      root_wife: root_wife,
      f1_husband1: f1_husband1,
      f1_wife1: f1_wife1,
      f1_husband2: f1_husband2,
      f1_wife2: f1_wife2,
      f2_husband1: f2_husband1
    ]
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
