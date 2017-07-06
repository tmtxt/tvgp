defmodule ApiServer.Services.Person do
  alias ApiServer.Repo
  alias ApiServer.Models.Postgres.Person, as: PgPerson
  alias ApiServer.Models.Neo4j.Person, as: NeoPerson
  alias ApiServer.Models.Neo4j.PedigreeRelation
  alias ApiServer.LogTrace.Core, as: LogTrace

  @doc """
  Insert person from parent
  """
  def insert_person_from_parent(person, parent_id, matching_parent_id, log_trace) do
    # insert person into postgres and neo4j
    %{person: person, node: person_node} = insert_person(person)

    # find parent node
    %{person: parent, node: parent_node} = get_person_by_id(parent_id, log_trace)
    %{person: matching_parent, node: matching_parent_node} =
    if matching_parent_id do
      get_person_by_id(matching_parent_id, log_trace)
    else
      %{person: nil, node: nil}
    end

    father_node = detect_father_node(parent, parent_node, matching_parent, matching_parent_node)
    mother_node = detect_mother_node(parent, parent_node, matching_parent, matching_parent_node)

    LogTrace.add(log_trace, :info, "father_node", father_node)
    LogTrace.add(log_trace, :info, "mother_node", mother_node)

    PedigreeRelation.link_family(father_node, mother_node, person_node)

    person
  end

  def detect_father_node(parent, parent_node, matching_parent, matching_parent_node) do
    %{gender: gender} = parent

    case gender do
      "male" ->
        parent_node
      "les" ->
        parent_node
      _ ->
        matching_parent_node
    end
  end

  def detect_mother_node(parent, parent_node, matching_parent, matching_parent_node) do
    %{gender: gender} = parent

    case gender do
      "female" ->
        parent_node
      "gay" ->
        parent_node
      _ ->
        matching_parent_node
    end
  end

  @doc """
  Get person from pg and neo4j
  """
  def get_person_by_id(person_id, log_trace) do
    res = Task.yield_many([
      Task.async(fn -> PgPerson.get_by_id(person_id) end),
      Task.async(fn -> NeoPerson.find_node_from_person_id(person_id, log_trace) end)
    ])

    [{_, {:ok, person}}, {_, {:ok, node}}] = res

    %{person: person, node: node}
  end

  @doc """
  Insert one new person into both postgres and neo4j, return the postgres model and neo4j node
  Not use to insert root
  """
  def insert_person(person) do
    person = PgPerson.changeset(%PgPerson{}, person)

    person = Repo.insert!(person)
    node = NeoPerson.insert_person(person, false)

    %{ person: person, node: node}
  end
end
