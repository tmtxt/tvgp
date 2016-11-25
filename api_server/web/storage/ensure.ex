defmodule EnsureStorage do
  def ensure() do
    if System.get_env("POSTGRES_ENSURE_STORAGE") == "true" do
      IO.puts "1"
    else
      IO.puts "2"
    end
  end
end
