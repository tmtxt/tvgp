defmodule ApiServer.SeedData.Person do

  alias ApiServer.Models.Neo4j.Person, as: NeoPerson
  alias ApiServer.Models.Neo4j.MarriageRelation
  alias ApiServer.Models.Neo4j.PedigreeRelation
  alias ApiServer.Models.Postgres.Person
  alias ApiServer.LogTrace.Core, as: LogTrace
  alias ApiServer.Repo

  def seed_person_data(log_trace) do
    root_node = insert_person(
      %{
        full_name: "Root",
        gender: "male",
        alive_status: "dead"
      }, true, log_trace)
    wife_node = insert_person(
      %{
        full_name: "Root wife",
        gender: "female",
        alive_status: "dead"
      }, false, log_trace)
    f1_1_husband_node = insert_person(
      %{
        full_name: "F1-1 husband",
        gender: "male",
        alive_status: "dead"
      }, false, log_trace)
    f1_1_wife_node = insert_person(
      %{
        full_name: "F1-2 wife",
        gender: "female",
        alive_status: "dead"
      }, false, log_trace)
    f1_2_husband_node = insert_person(
      %{
        full_name: "F1-2 husband",
        gender: "male",
        alive_status: "dead"
      }, false, log_trace)
    f1_2_wife_node = insert_person(
      %{
        full_name: "F1-2 wife",
        gender: "female",
        alive_status: "dead"
      }, false, log_trace)
    f2_1_husband_node = insert_person(
      %{
        full_name: "F2-1 husband",
        gender: "male",
        alive_status: "dead"
      }, false, log_trace)
    f2_1_wife_node = insert_person(
      %{
        full_name: "F2-2 wife",
        gender: "female",
        alive_status: "dead"
      }, false, log_trace)
    f2_2_husband_node = insert_person(
      %{
        full_name: "F2-2 husband",
        gender: "male",
        alive_status: "dead"
      }, false, log_trace)

    MarriageRelation.link_people(root_node, wife_node)
    MarriageRelation.link_people(f1_1_husband_node, f1_1_wife_node)
    MarriageRelation.link_people(f1_2_husband_node, f1_2_wife_node)
    MarriageRelation.link_people(f2_1_husband_node, f2_1_wife_node)

    PedigreeRelation.link_family(root_node, wife_node, f1_1_husband_node)
    PedigreeRelation.link_family(root_node, wife_node, f1_2_husband_node)
    PedigreeRelation.link_family(f1_1_husband_node, f1_1_wife_node, f2_1_husband_node)
    PedigreeRelation.link_family(f1_2_husband_node, f1_2_wife_node, f2_2_husband_node)
  end

  defp insert_person(person_data, is_root, log_trace) do
    %{full_name: full_name} = person_data
    person_data = Person.changeset(%Person{}, person_data)

    pg_person = Repo.insert!(person_data)
    node = NeoPerson.insert_person(pg_person, is_root)

    LogTrace.add(log_trace, :info, "insert_person", "Person #{full_name} inserted")
    node
  end
end
