defmodule ApiServer.Test.Services.Auth.CreateUserTest do
  use ApiServer.ConnCase, async: false

  alias ApiServer.Services.Auth, as: AuthService
  alias ApiServer.Services.Auth.Errors, as: AuthErrors

  alias ApiServer.Repo
  alias ApiServer.Models.Postgres.User

  alias Plug.Conn


  setup_all do
    on_exit fn ->
      Repo.delete_all(User)
    end
  end


  describe "Auth Service" do
    test "Missing data - Throw changeset" do
      user_data = %{
        username: "admin",
        password: "admin"
      }
      %AuthErrors.CreateUserError{} = catch_error(AuthService.create_user(user_data))
    end


    test "Create user" do
      user_data = %{
        email: "me@truongtx.me",
        username: "admin_test",
        password: "admin",
        user_role: "admin"
      }

      # call service
      result = AuthService.create_user(user_data)
      %User{
        email: "me@truongtx.me",
        user_role: "admin",
        username: "admin_test"
      } = result

      # check in database
      %User{
        email: "me@truongtx.me",
        user_role: "admin",
        username: "admin_test"
      } = Repo.get_by(User, username: "admin_test")
    end


    test "Login" do
      username = "admin_test"
      password = "admin"

      result = AuthService.login(username, password)
      %{
        username: "admin_test",
        user_role: "admin",
        expired_at: expired_at
      } = result
      one_week_later = DateTime.to_unix(DateTime.utc_now()) + 604800
      assert(one_week_later - expired_at < 10000)
    end


    test "Ensure admin user" do
      # login first
      username = "admin_test"
      password = "admin"
      result = AuthService.login(username, password)
      %{ auth_token: auth_token } = result

      # build the conn
      conn = build_conn()
      |> Conn.put_req_header("tvgp-auth-token", auth_token)

      # ensure
      %{} = AuthService.ensure_admin_user(conn)
    end
  end
end
