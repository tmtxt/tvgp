defmodule ApiServer.Repo.Migrations.UpdateUserTable1 do
  use Ecto.Migration

  def change do
    execute """
    ALTER TABLE "user" ADD CONSTRAINT user_username_unique UNIQUE ("username");
    """
  end
end
