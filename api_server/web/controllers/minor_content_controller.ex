defmodule ApiServer.MinorContentController do
  use ApiServer.Web, :controller

  alias ApiServer.Repo
  alias ApiServer.Models.Postgres.MinorContent

  @doc """
  Response
  {
    "picture": <string>,
    "content": <string>
  }
  """
  def get_preface(conn, _params) do
    preface = Repo.get_by(MinorContent, key: MinorContent.key_preface)
    json(conn, preface.value)
  end
end
