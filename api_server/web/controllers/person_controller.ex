defmodule ApiServer.PersonController do
  use ApiServer.Web, :controller
  alias ApiServer.Models.Postgres.Person, as: PgPerson
  alias ApiServer.Services.Person, as: PersonService

  defmodule PersonNotFoundError do
    defexception message: "Person not found", plug_status: 404
  end

  defmodule FromRoleNotSupportedError do
    defexception message: "From role not supported", plug_status: 400
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


  def add_person(conn, params) do
    log_trace = conn.assigns.log_trace

    %{
      "from_role" => from_role,
      "person" => person,
      "parent_id" => parent_id
    } = params
    matching_parent_id = Map.get(params, "matching_parent_id")

    person = case from_role do
               "parent" ->
                 PersonService.insert_person_from_parent(
                   person, parent_id, matching_parent_id, log_trace
                 )
               _ ->
                 raise FromRoleNotSupportedError,
                   message: "From role '#{from_role}' not supported"
             end

    json(conn, person)
  end
end
