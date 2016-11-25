defmodule ApiServer.SeedData do

  alias ApiServer.Repo
  alias ApiServer.Models.Postgres.User

  def run() do
    if System.get_env("API_SERVER_SEED_DATA") == "true" do
      {:ok, _} = Application.ensure_all_started(:api_server)
      insert_admin()

      IO.puts "Finish seeding data"
    end
  end

  defp insert_admin() do
    admin = User.changeset(
      %User{}, %{
        username: "admin",
        password: "admin",
        email: "admin@admin.admin"
      }
    )
    Repo.insert(admin)
  end
end
