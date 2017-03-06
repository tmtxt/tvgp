defmodule ApiServer.Models.Postgres.Person do
  use ApiServer.Web, :model
  alias ApiServer.Repo

  @derive {Poison.Encoder, except: [:__meta__]}
  @primary_key {:id, :id, [autogenerate: true]}

  schema "person" do
    field :full_name, :string
    field :birth_date, :integer
    field :death_date, :integer
    field :alive_status, :string
    field :job, :string
    field :address, :string
    field :picture, :string
    field :gender, :string
    field :phone_no, :string
    field :summary, :string
  end


  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, fields_list())
  end


  @doc """
  Insert the person map to the data base, return the model
  """
  def insert(person) do
    data = changeset(%ApiServer.Models.Postgres.Person{}, person)
    Repo.insert! data
  end

  @doc """
  Delete all records
  """
  def delete_all() do
    Repo.delete_all(ApiServer.Models.Postgres.Person)
  end

  @doc """
  Get the record by id
  """
  def get_by_id(person_id) do
    Repo.get_by(ApiServer.Models.Postgres.Person, id: person_id)
  end


  defp fields_list(), do: [:full_name, :birth_date, :death_date, :alive_status, :job, :address,
                           :picture, :gender, :phone_no, :summary]
end
