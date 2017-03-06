defimpl Poison.Encoder, for: Tuple do
  def encode(tuple, options) do
    tuple = [":tuple"] ++ Tuple.to_list(tuple)
    Poison.Encoder.List.encode(tuple, options)
  end
end

defimpl Poison.Encoder, for: PID do
  def encode(pid, options) do
    "PID"
  end
end

defimpl Poison.Encoder, for: Reference do
  def encode(pid, options) do
    "Reference"
  end
end
