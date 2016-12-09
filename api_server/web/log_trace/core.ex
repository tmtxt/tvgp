defmodule ApiServer.LogTrace.Core do
  require Logger
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
  def create(opts \\ %{}) do
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


  @doc """
  Add log entry to the trace
  """
  def add(log_trace_instance, level, title, message)
  when is_pid(log_trace_instance) and is_atom(level) and is_binary(title) do
    # log message
    message = cond do
      !is_binary(message) -> Poison.encode!(message, pretty: true)
      true -> message
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
    messages = messages ++ [ log_entry ]

    Agent.update(log_trace_instance, fn(data) ->
      %{ data | messages: messages }
    end)
  end


  @doc """
  Write the whole log trace to console
  """
  def write(log_trace_instance) do
    # retrive the log data
    data = Agent.get(log_trace_instance, &(&1))
    messages = data.messages;

    # detect the log level
    log_level = detect_log_level(messages)

    # process the messages
    messages = messages
    |> Enum.with_index(1)
    |> Enum.map(fn {message, index} ->
      level = message.level
      |> Atom.to_string
      |> String.upcase
      "\t[#{index}] #{level} #{message.title} : #{message.message}"
    end)
    |> Enum.join("\n")

    # processing time
    finished_at = Util.now
    processing_time = finished_at - data.started_at
    data = put_in(data, [:processing_time], "#{processing_time} ms")

    # process other data
    data = data
    |> Map.delete(:messages)
    |> Map.delete(:started_at)

    # format other props
    str = data
    |> Iteraptor.to_flatmap
    |> Enum.map(fn({k, v}) ->
      value = Poison.encode!(v, pretty: true)
      "\t#{k}: #{value}"
    end)
    |> Enum.join("\n")

    # write log
    log_message = str <> "\n" <> messages <> "\n"
    write_log log_level, log_message
  end


  @doc """
  Write the whole log trace and kill the log trace instance
  """
  def stop(log_trace_instance) do
    write(log_trace_instance)
    Agent.stop(log_trace_instance)
  end


  # write log based on the level
  defp write_log(level, message) do
    case level do
      :debug -> Logger.debug message
      :info -> Logger.info message
      :warn -> Logger.warn message
      _ -> Logger.error message
    end
  end


  # detect the log level based on all the traces
  defp detect_log_level(messages) do
    try_get_level(messages, :error) ||
      try_get_level(messages, :warn) ||
      try_get_level(messages, :info) ||
      try_get_level(messages, :debug)
  end

  defp try_get_level(messages, level) do
    Enum.find(
      messages,
      fn(message) ->
        message.level == level
      end
    ) && level || nil;
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
