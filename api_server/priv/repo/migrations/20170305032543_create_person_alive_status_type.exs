defmodule ApiServer.Repo.Migrations.CreatePersonAliveStatusType do
  use Ecto.Migration

  def change do
    execute """
    CREATE TYPE PERSON_ALIVE_STATUS_ENUM AS ENUM ('alive', 'dead', 'unknown');
    """
  end
end
