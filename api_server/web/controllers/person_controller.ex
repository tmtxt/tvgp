defmodule ApiServer.PersonController do
  use ApiServer.Web, :controller
  alias ApiServer.Models.Postgres.Person, as: PgPerson

  defmodule PersonNotFoundError do
    defexception message: "Person not found", plug_status: 404
  end

  @doc """
  Get the person info
  """
  def get_person_by_id(conn, params) do
    log_trace = conn.assigns.log_trace

    # parse person id
    person_id = params |> Map.get("person_id") |> String.to_integer
    LogTrace.add(log_trace, :info, "Person id", person_id)

    # get from database
    person = PgPerson.get_by_id(person_id)
    if !person do
      raise PersonNotFoundError
    end

    json(conn, person)
  end
end
