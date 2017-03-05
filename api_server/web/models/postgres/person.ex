defmodule ApiServer.Models.Postgres.User do
  use ApiServer.Web, :model

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


  defp fields_list(), do: [:full_name, :birth_date, :death_date, :alive_status, :job, :address,
                           :picture, :gender, :phone_no, :summary]
end
