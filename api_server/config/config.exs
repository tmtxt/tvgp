# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :api_server,
  ecto_repos: [ApiServer.Repo]

# Configures the endpoint
config :api_server, ApiServer.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "2jC+jfWjfSBCKN9i/RdSaHLV7sPSJAgmmuCBDXNPWydU2GTnsRwFuUrPhbftf2tX",
  render_errors: [view: ApiServer.ErrorView, accepts: ~w(html json)],
  pubsub: [name: ApiServer.PubSub,
           adapter: Phoenix.PubSub.PG2],
  http: [port: String.to_integer(System.get_env("API_SERVER_PORT") || "4000")],
  debug_errors: false,
  check_origin: false,
  watchers: [],

  # code reloading
  code_reloader: System.get_env("API_SERVER_CODE_RELOADER") == "true",
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time [$level]\n$message\n",
  metadata: [:request_id]

# Configure your database
config :api_server, ApiServer.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("POSTGRES_USER"),
  database: System.get_env("POSTGRES_DATABASE"),
  hostname: System.get_env("POSTGRES_SERVER"),
  port: System.get_env("POSTGRES_PORT"),
  loggers: [],
  pool_size: 10

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, String.to_integer(
  System.get_env("API_SERVER_STACKTRACE_DEPTH") || "20"
)

# Redis config
config :api_server, ApiServer.RedisPool,
  hostname: System.get_env("REDIS_SERVER") || "localhost",
  port: String.to_integer(System.get_env("REDIS_PORT") || "6379")

# Neo4j config
config :neo4j_sips, Neo4j,
  url: "http://#{System.get_env("NEO4J_SERVER")}:#{System.get_env("NEO4J_PORT")}",
  pool_size: 5,
  max_overflow: 2,
  timeout: 30
