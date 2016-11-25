defmodule ApiServer.Services.Auth do

  alias Plug.Conn
  alias ApiServer.Repo
  alias ApiServer.RedisPool
  alias ApiServer.Services.Auth.Errors, as: AuthErrors
  alias ApiServer.Models.Postgres.User
  import Ecto.Query

  @typedoc """
  Context data type for logging
  """
  @type context :: %{log_trace: map}

  @doc """
  Create auth user and main user
  Throw Ecto.Changeset if not success

  Return a map with 2 keys `auth_user` and `main_user`
  """
  @spec create_user(context, map) :: map
  def create_user(conn, user_data) do
    user = User.changeset(%User{}, user_data)
    # user = case User.insert(user) do
    #          {:ok, user} -> user
    #          {:error, changeset} -> raise
    #        end
  end

end
