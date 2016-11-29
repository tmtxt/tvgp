defmodule ApiServer.LogTrace.Core do
  alias ApiServer.Util
  alias ApiServer.LogTrace.Core.LogTrace

  def create(opts) do
    log_trace_data = create_log_trace_data(opts)
    {:ok, pid} = Agent.start_link(fn -> log_trace_data end)
    pid
  end

  defp create_log_trace_data(opts \\ %{}) do
    started_at = Util.now
    correlation_id = Map.get(opts, :correlation_id, UUID.uuid4()) || UUID.uuid4()

    %{
      started_at: started_at,
      correlation_id: correlation_id,
      messages: []
    }
  end
end
