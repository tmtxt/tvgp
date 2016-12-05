defimpl Poison.Encoder, for: Tuple do
  def encode(tuple, options) do
    tuple = [":tuple"] ++ Tuple.to_list(tuple)
    Poison.Encoder.List.encode(tuple, options)
  end
end
