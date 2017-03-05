defmodule ApiServer.MinorContentController do
  use ApiServer.Web, :controller

  alias ApiServer.Repo
  alias ApiServer.Models.Postgres.MinorContent
  alias ApiServer.Services.Auth, as: AuthService

  @doc """
  Response
  {
    "picture": <string>,
    "content": <string>
  }
  """
  def get_preface(conn, _params) do
    preface = Repo.get_by(MinorContent, key: MinorContent.key_preface)
    json(conn, preface.value)
  end


  @doc """
  Update the preface value
  Request
  {
    "content": <string>
  }
  Response
  {
    "picture": <string>,
    "content": <string>
  }
  """
  def set_preface(conn, params) do
    AuthService.ensure_admin_user(conn)
    log_trace = conn.assigns.log_trace

    # get the current preface from database
    preface = Repo.get_by(MinorContent, key: MinorContent.key_preface)
    current_value = preface.value;
    LogTrace.add(log_trace, :info, "set_preface - current value", current_value)

    new_content = Map.get(params, "content", "")
    value = %{current_value | "content" => new_content}
    LogTrace.add(log_trace, :info, "set_preface - new value", value)

    new_preface = Ecto.Changeset.change(preface, value: value)
    new_preface = Repo.update!(new_preface)
    LogTrace.add(log_trace, :info, "set_preface", "updated!")

    json(conn, new_preface.value)
  end
end
