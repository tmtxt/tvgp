defmodule ApiServer.EnsureStorage do
  alias Ecto.Migrator
  alias ApiServer.LogTrace.Core, as: LogTrace

  def run() do
    if System.get_env("POSTGRES_ENSURE_STORAGE") == "true" do
      log_trace = LogTrace.create()

      directory = Application.app_dir(:api_server, "priv/repo/migrations")
      LogTrace.add(log_trace, :info, "Ensure Storage - directory", directory)

      Migrator.run(ApiServer.Repo, directory, :up, all: true, log: false)
      LogTrace.add(log_trace, :info, "Ensure Storage", "DONE!")

      LogTrace.stop(log_trace)
    end
  end
end
