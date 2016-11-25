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

  @typedoc """
  The return data after login
  """
  @type login_data :: %{
    username: String.t,
    user_role: String.t,
    auth_token: String.t,
    expired_at: number
  }


  @doc """
  Create new user
  Raise CreateUserError if not success
  """
  @spec create_user(context, map) :: User
  def create_user(conn, user_data) do
    user = User.changeset(%User{}, user_data)
    user = case Repo.insert(user) do
             {:ok, user} -> user
             {:error, changeset} -> raise AuthErrors.CreateUserError, changeset: changeset
           end
    user
  end


  @doc """
  Login with username and password, generate the auth token and write to redis
  """
  @spec login(context, String.t, String.t) :: login_data
  def login(conn, username, password) do
    # get user
    user = User |> Repo.get_by(username: username)

    if !user do
      raise AuthErrors.LoginError
    end

    # compare password
    match = ExBcrypt.match(password, user.password)
    if !match do
      raise AuthErrors.LoginError
    end

    # generate auth token (username + uuid)
    %User{
      user_role: user_role, username: username
    } = user
    token = UUID.uuid4()

    # write to redis, set expire time 1 week later
    second_for_one_week = 604800
    now = DateTime.to_unix(DateTime.utc_now())
    expired_at = now + second_for_one_week
    redis_key = build_token_key token

    # write to redis
    res = case RedisPool.pipeline([
                ~w(HMSET #{redis_key} username #{username} userrole #{user_role}),
                ~w(EXPIREAT #{redis_key} #{expired_at}),
                ~w(HGETALL #{redis_key})
              ]) do
            {:ok, res} -> res
            {:error, error} -> raise AuthErrors.LoginError
          end

    %{
      username: username,
      user_role: user_role,
      auth_token: token,
      expired_at: expired_at * 1000
    }
  end


  defp build_token_key(token), do: "auth:#{token}"

end
