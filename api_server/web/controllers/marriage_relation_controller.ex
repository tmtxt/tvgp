defmodule ApiServer.MarriageRelationController do
  use ApiServer.Web, :controller

  alias ApiServer.Models.Neo4j.MarriageRelation
  alias ApiServer.Models.Postgres.Person, as: PgPerson

  @doc """
  Get all the marriages info by the input person id
  """
  def get_marriages_by_person_id(conn, params) do
    log_trace = conn.assigns.log_trace

    # parse person id
    person_id = get_person_id_from_params(params, log_trace)

    # get nodes from neo4j
    marriage_person_ids = person_id
    |> MarriageRelation.find_marriages_from_person_id()
    |> Enum.map(fn(node) ->
      %{"node" => %{ "person_id" => person_id }} = node
      person_id
    end)

    marriage_persons = PgPerson.get_by_ids(marriage_person_ids)

    json(conn, marriage_persons)
  end

  defp get_person_id_from_params(params, log_trace) do
    # parse person id
    person_id = params |> Map.get("person_id") |> String.to_integer
    LogTrace.add(log_trace, :info, "Person id", person_id)

    person_id
  end
end
