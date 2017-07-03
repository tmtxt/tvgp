defmodule ApiServer.PedigreeRelationController do
  use ApiServer.Web, :controller

  alias ApiServer.Models.Neo4j.PedigreeRelation
  alias ApiServer.Models.Postgres.Person, as: PgPerson

  @doc """
  Get the parent info by the input person id
  """
  def get_parents_by_person_id(conn, params) do
    log_trace = conn.assigns.log_trace

    # parse person id
    person_id = params |> Map.get("person_id") |> String.to_integer
    LogTrace.add(log_trace, :info, "Person id", person_id)

    # find the parent nodes of this person from neo4j
    parent_nodes = PedigreeRelation.get_parent_nodes(person_id)
    parent_ids = extract_parent_ids(parent_nodes)

    # find the parent info from postgres
    parents_map = PgPerson.get_by_ids(parent_ids, "return-map")

    # add back the info the the parent_nodes array
    parents = Enum.map(parent_nodes, fn(parent_node) ->
      parent_id = Map.get(parent_node, "person_id")
      parent_info = Map.get(parents_map, parent_id)
      Map.merge(parent_node, parent_info)
    end)

    json(conn, parents)
  end

  defp extract_parent_ids(parent_nodes) do
    parent_nodes
    |> Enum.map(fn(parent_node) ->
      Map.get(parent_node, "person_id")
    end)
  end
end
