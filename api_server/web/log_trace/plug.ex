defmodule ApiServer.LogTrace.Plug do
  alias Plug.Conn

  # plug
  def init(opts), do: opts

  def call(conn, _opts) do
    log_trace = %{}
    conn = Conn.assign conn, :log_trace, log_trace

    Conn.register_before_send(conn, fn conn ->
      conn
    end)
  end
end
