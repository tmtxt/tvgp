defmodule ApiServer.AuthController do
  use ApiServer.Web, :controller
  alias ApiServer.Services.Auth, as: AuthService

  @doc """
  Get the current logged in user.
  If not logged in
  {
    authenticated: false
  }
  If logged in
  {
    authenticated: true,
    username: <string>,
    user_role: <string>
  }
  """
  def get_user(conn, _params) do
    user = AuthService.get_current_user(conn)
    if user do
      json(conn, user)
    else
      json(conn, %{authenticated: false})
    end
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

    res = AuthService.login(username, password)
    LogTrace.add(log_trace, :info, "login", "User #{username} logged in")

    json(conn, res)
  end
end
