defmodule ApiServer.Repo.Migrations.CreateMinorContentTable do
  use Ecto.Migration

  def change do
    execute """
    CREATE TABLE minor_content (
        id SERIAL NOT NULL PRIMARY KEY,
        "key" VARCHAR(500) UNIQUE NOT NULL,
        "value" JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
        );
    """
  end
end
