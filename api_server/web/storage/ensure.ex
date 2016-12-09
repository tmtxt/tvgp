defmodule ApiServer.EnsureStorage do
  alias Ecto.Migrator

  def run() do
    if System.get_env("POSTGRES_ENSURE_STORAGE") == "true" do
      # {:ok, _} = Application.ensure_all_started(:api_server)
      directory = Application.app_dir(:api_server, "priv/repo/migrations")
      Migrator.run(ApiServer.Repo, directory, :up, all: true)
    end
  end
end
