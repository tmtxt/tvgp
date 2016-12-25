defmodule ApiServer.Models.Postgres.User do
  use ApiServer.Web, :model

  @derive {Poison.Encoder, except: [:__meta__, :password]}
  @primary_key {:id, :id, [autogenerate: true]}

  schema "user" do
    field :username, :string
    field :email, :string
    field :password, :string
    field :user_role, :string
  end


  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :email, :password, :user_role])
    |> validate_required([:username, :email, :password])
    |> unique_constraint(:username, name: "user_username_unique")
    |> unique_constraint(:email, name: "user_email_unique")
    |> update_change(:password, &Comeonin.Bcrypt.hashpwsalt/1)
  end


  def hash_password(password) do
    Comeonin.Bcrypt.hashpwsalt(password)
  end


  def user_role_user(), do: "user"
  def user_role_admin(), do: "admin"

end
