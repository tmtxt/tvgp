defmodule ApiServer.Models.Postgres.MinorContent do
  use ApiServer.Web, :model

  @derive {Poison.Encoder, except: [:__meta__, :password]}
  @primary_key {:id, :id, [autogenerate: true]}

  schema "minor_content" do
    field :key, :string
    field :value, :map
  end


  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:key, :value])
    |> validate_required([:key, :value])
    |> unique_constraint(:key, name: "minor_content_key_unique")
  end


  def key_preface(), do: "preface"
end
