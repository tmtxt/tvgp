defmodule ApiServer.LogTrace.HttpLogTrace do
  alias Plug.Conn
  alias ApiServer.LogTrace.Core, as: LogTrace

  # plug
  def init(opts), do: opts

  def call(conn, _opts) do
    log_opts = %{
      correlation_id: get_correlation_id(conn)
    }
    log_trace = LogTrace.create(log_opts)

    # set request data to the log trace instance
    request_data = process_request_data conn
    LogTrace.set_in(log_trace, [:http], %{})
    LogTrace.set_in(log_trace, [:http, :request], request_data);

    # add initial log data
    LogTrace.add(log_trace, :info, "Request", "STARTED")

    conn = Conn.assign conn, :log_trace, log_trace

    Conn.register_before_send(conn, fn conn ->
      response_data = process_response_data(conn)

      cond do
        conn.status >= 500 -> LogTrace.add log_trace, :error, "Request", Exception.message(conn.assigns.reason)
        conn.status >= 400 -> LogTrace.add(log_trace, :warn, "Request", Exception.message(conn.assigns.reason))
        true -> nil
      end

      if (conn.status) >= 400 do
        LogTrace.add(log_trace, :warn, "Stacktrace", "\n#{Exception.format_stacktrace(conn.assigns.stack)}")
      end

      LogTrace.set_in(log_trace, [:http, :response], response_data)
      LogTrace.add(log_trace, :info, "Request", "END")
      LogTrace.stop(log_trace)
      conn
    end)
  end


  # Process the connection for the response data
  def process_response_data(conn) do
    %{
      status: conn.status
    }
  end


  # Process the connection to store the request data
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

  # Get correlation id from request header
  defp get_correlation_id(conn) do
    conn |> Conn.get_req_header("correlation-id") |> List.first
  end
end
