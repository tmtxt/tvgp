defmodule ApiServer.Repo.Migrations.CreatePersonGenderType do
  use Ecto.Migration

  def change do
    execute """
    CREATE TYPE PERSON_GENDER_ENUM AS ENUM ('male', 'female', 'gay', 'les', 'unknown');
    """
  end
end
