defmodule ApiServer.PedigreeRelationController do
  use ApiServer.Web, :controller

  alias ApiServer.Models.Neo4j.PedigreeRelation

  @doc """
  Get the parent info by the input person id
  """
  def get_parent_by_person_id(conn, params) do
    log_trace = conn.assigns.log_trace

    # parse person id
    person_id = params |> Map.get("person_id") |> String.to_integer
    LogTrace.add(log_trace, :info, "Person id", person_id)

    parents = PedigreeRelation.get_parent_nodes(person_id)

    json(conn, parents)
  end

  defp extract_parent_ids(parents) do

  end
end
