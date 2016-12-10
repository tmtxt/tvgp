defmodule ApiServer.RedisPool do
  def create_redis_pools(pool_size) do
    config = Application.get_env :api_server, ApiServer.RedisPool
    host = Keyword.get(config, :hostname, "localhost")
    port = Keyword.get(config, :port, 6379)

    for i <- 0..(pool_size - 1) do
      Supervisor.Spec.worker(
        Redix, [[host: host, port: port], [name: :"redix_#{i}"]], id: {Redix, i}
      )
    end
  end

  def command(command) do
    Redix.command(:"redix_#{random_index()}", command)
  end

  def pipeline(commands) do
    Redix.pipeline(:"redix_#{random_index()}", commands)
  end

  defp random_index() do
    rem(System.unique_integer([:positive]), 5)
  end
end
