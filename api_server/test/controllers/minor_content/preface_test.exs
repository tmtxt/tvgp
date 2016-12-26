defmodule ApiServer.Test.Controllers.MinorContent.Preface do
  use ApiServer.ConnCase

  alias ApiServer.Repo
  alias ApiServer.Models.Postgres.MinorContent

  setup do
    insert_preface()
    on_exit fn ->
      Repo.delete_all(MinorContent)
    end
  end


  test "Get preface api", %{conn: conn} do
    conn = get(conn, "/api/minor-contents/preface")
    %{
      "picture" => "/picture.png",
      "content" => "test"
    } = json_response(conn, 200)
  end


  test "Set preface api", %{conn: conn} do
    conn = post(
      conn, "/api/minor-contents/preface", %{
        content: "new content"
      }
    )
    %{
      "content" => "new content"
    } = json_response(conn, 200)
  end


  # insert sample data
  defp insert_preface() do
    preface = MinorContent.changeset(
      %MinorContent{}, %{
        key: MinorContent.key_preface,
        value: %{
          picture: "/picture.png",
          content: "test"
        }
      }
    )
    Repo.insert!(preface)
  end
end
