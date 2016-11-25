defmodule ApiServer.Repo.Migrations.UpdateUserTable4 do
  use Ecto.Migration

  def change do
    execute """
    ALTER TABLE "user" ADD COLUMN "user_role" USER_ROLE_ENUM NOT NULL DEFAULT 'user';
    """
  end
end
