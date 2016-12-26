defmodule ApiServer.Repo.Migrations.UpdateMinorContentTable1 do
  use Ecto.Migration

  def change do
    execute """
    ALTER TABLE "minor_content" ADD CONSTRAINT minor_content_key_unique UNIQUE ("key");
    """
  end
end
