defmodule ApiServer.Plug.Params do
  alias Plug.Conn

  @moduledoc """
  Plug to fix Plug.Conn.fetch_query_params
  Just put it before Plug.Parsers
  """

  def init(opts), do: opts

  def call(conn, _opts) do
    %Conn{params: params} = conn
    params = Map.from_struct(params)
    %Conn{conn | params: params}
  end
end
