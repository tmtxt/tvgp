defmodule ApiServer.Services.Person do
  alias ApiServer.Models.Postgres.Person
  alias ApiServer.Models.Neo4j.Person, as: NeoPerson

  @doc """
  Insert person from parent
  """
  def insert_person_from_parent(person, parent_id, matching_parent_id, log_trace) do
    # insert person into postgres and neo4j
    # %{node: person_node} = insert_person(person)

    # find parent node
    parent_node = NeoPerson.find_node_from_person_id(parent_id, log_trace)
    matching_parent_node = if matching_parent_id do
      NeoPerson.find_node_from_person_id(matching_parent_id, log_trace)
    end

    %{parent_node: parent_node, matching_parent_node: matching_parent_node}
  end

  @doc """
  Insert one new person into both postgres and neo4j, return the postgres model and neo4j node
  Not use to insert root
  """
  def insert_person(person) do
    person = Person.changeset(%Person{}, person)

    person = Repo.insert!(person)
    node = NeoPerson.insert_person(person, false)

    %{ person: person, node: node}
  end
end
