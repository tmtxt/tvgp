defmodule ApiServer.Repo.Migrations.UpdateUserTable3 do
  use Ecto.Migration

  def change do
    execute """
    CREATE TYPE USER_ROLE_ENUM AS ENUM (
        'user',
        'admin'
        );
    """
  end
end
