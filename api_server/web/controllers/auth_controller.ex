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


  @doc """
  Login
  """
  def login(conn, params) do
    log_trace = conn.assigns.log_trace
    %{"username" => username, "password" => password} = params

    res = AuthService.login(username, password)
    LogTrace.add(log_trace, :info, "login", "User #{username} logged in")

    json(conn, res)
  end


  @doc """
  Logout
  """
  def logout(conn, _params) do
    log_trace = conn.assigns.log_trace
    %{auth_token: auth_token, username: username} = AuthService.ensure_logged_in_user(conn)
    AuthService.logout(auth_token)

    LogTrace.add(log_trace, :info, "logout", "User #{username} logged out")
    send_resp(conn, 200, "")
  end


  @doc """
  Change password
  """
  def change_password(conn, params) do
    log_trace = conn.assigns.log_trace

    # ensure token
    %{auth_token: auth_token, username: username} = AuthService.ensure_logged_in_user(conn)
    LogTrace.add(log_trace, :info, "change_password", "authenticated")

    # change password
    %{
      old_password: old_password,
      new_password: new_password
    } = params
    AuthService.change_password(username, old_password, new_password, auth_token)
    LogTrace.add(log_trace, :info, "change_password", "#{username}'s password changed")

    # login again
    res = AuthService.login(username, password)
    LogTrace.add(log_trace, :info, "change_password", "Login again")

    json(conn, res)
  end
end
