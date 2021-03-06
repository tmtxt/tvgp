defmodule ApiServer.Util do

  @doc """
  Return current timestamp
  """
  def now(unit \\ :milli_seconds), do: :os.system_time(:milli_seconds)

  @doc """
  Convert a map to a specified struct
  to_struct $User{}, params
  """
  def to_struct(kind, attrs) do
    struct = struct(kind)
    Enum.reduce Map.to_list(struct), struct, fn {k, _}, acc ->
      case Map.fetch(attrs, Atom.to_string(k)) do
        {:ok, v} -> %{acc | k => v}
        :error -> acc
      end
    end
  end


  def to_atom_map(map) do
    map
    |> Enum.reduce(%{}, fn({k, v}, acc) ->
      k = String.to_atom(k)
      Map.put(acc, k, v)
    end)
  end
end
