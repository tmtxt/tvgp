defmodule ApiServer do
  use Application

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # supervisors for backing services
    children = [
      supervisor(ApiServer.Repo, []),
      worker(Neo4j.Sips, [Application.get_env(:neo4j_sips, Neo4j)])
    ]
    children = children ++ ApiServer.RedisPool.create_redis_pools(5)

    # start supervisors for backing services first
    opts = [strategy: :one_for_one, name: ApiServer.Supervisor]
    {:ok, pid} = res = Supervisor.start_link(children, opts)

    # ensure storage + seed data if necessary
    ApiServer.EnsureStorage.run()
    :ok = Supervisor.terminate_child(pid, ApiServer.Repo)    # new type added, need to restart the connection
    {:ok, _} = Supervisor.restart_child(pid, ApiServer.Repo) # new type added, need to restart the connection
    ApiServer.SeedData.run()

    # start the http server
    {:ok, _} = Supervisor.start_child(pid, supervisor(ApiServer.Endpoint, []))

    # success
    res
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ApiServer.Endpoint.config_change(changed, removed)
    :ok
  end
end
