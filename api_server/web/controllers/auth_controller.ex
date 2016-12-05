defmodule ApiServer.AuthController do
  use ApiServer.Web, :controller
  alias ApiServer.Services.Auth, as: AuthService

  def get_user(conn, _params) do
    json conn, %{id_hello: "hello"}
  end


  @doc """
  Response: see create_user function
  """
  def create_user(conn, params) do
    AuthService.ensure_admin_user(conn)
    res = AuthService.create_user params
    json(conn, res)
  end


  def login(conn, params) do
    log_trace = conn.assigns.log_trace
    %{"username" => username, "password" => password} = params

    LogTrace.add(log_trace, :info, "login", "User #{username} logged in")

    json(conn, AuthService.login(username, password))
  end
end
