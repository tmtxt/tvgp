defmodule ApiServer.AuthController do
  use ApiServer.Web, :controller
  alias ApiServer.LogTrace.Core, as: LogTrace

  alias ApiServer.Services.Auth, as: AuthService

  def get_user(conn, _params) do
    json conn, %{id_hello: "hello"}
  end


  @doc """
  Response: see create_user function
  """
  def create_user(conn, params) do
    AuthService.ensure_admin_user(conn)
    res = AuthService.create_user conn, params
    json(conn, res)
  end


  def login(conn, params) do
    log_trace = conn.assigns.log_trace
    LogTrace.add(log_trace, :info, "a", "c")
    LogTrace.add(log_trace, :info, "a", %{})
    %{"username" => username, "password" => password} = params
    json(conn, AuthService.login(conn, username, password))
  end
end
