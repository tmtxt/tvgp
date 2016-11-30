defmodule ApiServer.LogTrace.Core do
  alias ApiServer.Util

  @moduledoc """
  Core module for Log Trace
  The Log Trace instance is an Agent process which holds the log data, started via start_link
  The Log Trace instance is stored as a pid
  """


  @doc """
  Create the Log Trace instance.
  The return data is the process pid
  """
  @spec create(map) :: pid
  def create(opts) do
    log_trace_data = create_log_trace_data(opts)
    {:ok, pid} = Agent.start_link(fn -> log_trace_data end)
    pid
  end


  @doc """
  Set data in the Log Trace map
  """
  @spec set_in(pid, List, any) :: nil
  def set_in(log_trace_instance, path, value) do
    data = Agent.get(log_trace_instance, &(&1))
    data = put_in(data, path, value)
    Agent.update(log_trace_instance, fn (_) -> data end)
  end


  def add(log_trace_instance, level, title, message)
  when is_pid(log_trace_instance) and is_atom(level) and is_binary(title) do
    # log message
    if (!is_binary(message)) do
      message = Poison.encode!(message, pretty: true)
    end

    # log entry
    log_entry = %{
      level: level,
      title: title,
      message: message
    }

    # add to messages
    data = Agent.get(log_trace_instance, &(&1))
    messages = data.messages
    messages = [ log_entry | messages ]

    Agent.update(log_trace_instance, fn(data) ->
      %{ data | messages: messages }
    end)
  end


  # Create initial log trace data, including messages list, started time and the correlation id
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
