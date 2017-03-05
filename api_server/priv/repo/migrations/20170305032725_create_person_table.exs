defmodule ApiServer.Repo.Migrations.CreatePersonTable do
  use Ecto.Migration

  def change do
    execute """
    CREATE TABLE person (
        id SERIAL NOT NULL PRIMARY KEY,
        full_name VARCHAR(500),
        birth_date TIMESTAMP WITHOUT TIME ZONE,
        death_date TIMESTAMP WITHOUT TIME ZONE,
        alive_status PERSON_ALIVE_STATUS_ENUM DEFAULT 'unknown',
        job TEXT,
        address TEXT,
        picture TEXT,
        gender PERSON_GENDER_ENUM DEFAULT 'unknown',
        phone_no VARCHAR(50),
        summary TEXT,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
        );
    """
  end
end
