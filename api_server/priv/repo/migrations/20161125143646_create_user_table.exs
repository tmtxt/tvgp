defmodule ApiServer.Repo.Migrations.CreateUserTable do
  use Ecto.Migration

  def change do
    execute """
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "username" VARCHAR(100),
        "email" VARCHAR(1000),
        "password" VARCHAR(1000),
        "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
      );
    """
  end
end
