defmodule ApiServer.Models.Postgres.Person do
  require Ecto.Query
  use ApiServer.Web, :model
  use Ecto.Schema

  alias ApiServer.Models.Postgres.Person
  alias ApiServer.Repo

  @derive {Poison.Encoder, except: [:__meta__]}
  @primary_key {:id, :id, [autogenerate: true]}

  schema "person" do
    field :full_name, :string
    field :birth_date, Ecto.DateTime
    field :death_date, Ecto.DateTime
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
    data = changeset(%Person{}, person)
    Repo.insert! data
  end

  @doc """
  Delete all records
  """
  def delete_all() do
    Repo.delete_all(Person)
  end

  @doc """
  Get the record by id
  """
  def get_by_id(person_id) do
    Repo.get_by(Person, id: person_id)
    |> ensure_person_picture()
  end


  @doc """
  Get all records by ids
  """
  def get_by_ids(person_ids) do
    query = from p in Person, where: p.id in ^person_ids
    ApiServer.Repo.all(query)
    |> Enum.map(&ensure_person_picture/1)
  end

  @doc """
  Similar to the above get_by_ids function, return a map with key is the person id
  instead of a list
  """
  def get_by_ids(person_ids, "return-map") do
    persons = get_by_ids(person_ids)
    Enum.reduce(
      persons,
      %{},
      fn(person, res) ->
        Map.put(res, Map.get(person, :id), person)
      end
    )
  end

  defp fields_list(), do: [:full_name, :birth_date, :death_date, :alive_status, :job, :address,
                           :picture, :gender, :phone_no, :summary]

  defp ensure_person_picture(person) do
    default_picture = :api_server
    |> Application.get_env(ApiServer.Services.Tree)
    |> Keyword.get(:default_person_picture)
    picture = Map.get(person, :picture, default_picture) || default_picture
    Map.put(person, :picture, picture)
  end
end
