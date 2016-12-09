defmodule ApiServer.SeedData do

  alias ApiServer.Repo
  alias ApiServer.Models.Postgres.User
  alias ApiServer.LogTrace.Core, as: LogTrace

  def run() do
    if System.get_env("API_SERVER_SEED_DATA") == "true" do
      log_trace = LogTrace.create()
      insert_admin(log_trace)
      LogTrace.add(log_trace, :info, "Seed data", "Seed data finish")
      LogTrace.stop(log_trace)
    end
  end

  defp insert_admin(log_trace) do
    admin = Repo.get_by(User, username: "admin")
    unless admin do
      data = User.changeset(
        %User{}, %{
          username: "admin",
          password: "admin",
          email: "admin@admin.admin",
          user_role: "admin"
        }
      )
      Repo.insert! data
      LogTrace.add(log_trace, :info, "insert_admin", "Admin inserted")
    end
  end
end
