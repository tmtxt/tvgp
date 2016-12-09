defmodule ApiServer.Test.Services.Auth.CreateUserTest do
  alias ApiServer.Services.Auth, as: AuthService
  alias ApiServer.Models.Postgres.User


  setup_all do
    on_exit fn ->
      Repo.delete_all(User)
    end
  end

  describe "Auth Service tests" do
    test "Missing data - Throw changeset" do
      user_data = %{
        username: "admin",
        password: "admin"
      }
      %ApiServer.Services.Auth.Errors.CreateUserError{} = catch_error(AuthService.create_user(user_data))
    end


    test "Create user" do
      conn = build_conn()
      user_data = %{
        email: "me@truongtx.me",
        username: "admin_test",
        password: "admin",
        user_role: "admin"
      }
      result = AuthService.create_user(user_data)
      %User{} = result
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
  end
end
