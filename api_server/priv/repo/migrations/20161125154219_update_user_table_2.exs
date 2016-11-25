defmodule ApiServer.Repo.Migrations.UpdateUserTable2 do
  use Ecto.Migration

  def change do
    execute """
    ALTER TABLE "user" ADD CONSTRAINT user_email_unique UNIQUE ("email");
    """
  end
end
