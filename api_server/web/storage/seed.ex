defmodule ApiServer.SeedData do

  alias ApiServer.Repo
  alias ApiServer.Models.Postgres.User
  alias ApiServer.Models.Postgres.MinorContent
  alias ApiServer.LogTrace.Core, as: LogTrace

  def run() do
    if System.get_env("API_SERVER_SEED_DATA") == "true" do
      log_trace = LogTrace.create()
      insert_admin(log_trace)
      insert_minor_content(log_trace)
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


  defp insert_minor_content(log_trace) do
    insert_preface(log_trace)
  end

  defp insert_preface(log_trace) do
    preface = Repo.get_by(MinorContent, key: "preface")
    unless preface do
      data = MinorContent.changeset(
        %MinorContent{}, %{
          key: MinorContent.key_preface,
          value: %{
            picture: "",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        }
      )

      Repo.insert!(data)
      LogTrace.add(log_trace, :info, "insert_preface", "Preface inserted")
    end
  end
end
