defmodule ApiServer.LogTrace.HttpLogTrace do
  import ProperCase
  alias Plug.Conn
  alias ApiServer.LogTrace.Core, as: LogTraceCore

  # plug
  def init(opts), do: opts

  def call(conn, _opts) do
    log_opts = %{
      correlation_id: get_correlation_id(conn)
    }
    log_trace = LogTraceCore.create(log_opts)
    request_data = process_request_data conn

    # conn = Conn.assign conn, :log_trace, log_trace
    Conn.register_before_send(conn, fn conn ->
      conn
    end)
  end


  defp process_request_data(conn) do
    %{
      method: String.upcase(conn.method),
      url: conn.request_path,
      headers: %{
        host: conn |> Conn.get_req_header("host") |> List.first,
        content_type: conn |> Conn.get_req_header("content-type") |> List.first
      }
    }
  end

  defp get_correlation_id(conn) do
    conn |> Conn.get_req_header("correlation-id") |> List.first
  end
end
