defmodule ApiServer.Services.Auth do

  alias Plug.Conn
  alias ApiServer.Repo
  alias ApiServer.RedisPool
  alias ApiServer.Services.Auth.Errors, as: AuthErrors
  alias ApiServer.Models.Postgres.User


  @typedoc """
  The return data after login
  """
  @type login_data :: %{
    username: String.t,
    user_role: String.t,
    auth_token: String.t,
    expired_at: number
  }


  @typedoc """
  The return data for ensure user functions
  """
  @type ensure_user_data :: %{
    username: String.t,
    user_role: String.t,
    auth_token: String.t
  }


  @doc """
  Create new user
  Raise CreateUserError if not success
  """
  @spec create_user(map) :: User
  def create_user(user_data) do
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
  @spec login(String.t, String.t) :: login_data
  def login(username, password) do
    # get user
    user = User |> Repo.get_by(username: username)

    if !user do
      raise AuthErrors.LoginError
    end

    # compare password
    match = Comeonin.Bcrypt.checkpw(password, user.password)
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
    case RedisPool.pipeline([
          ~w(HMSET #{redis_key} username #{username} userrole #{user_role}),
          ~w(EXPIREAT #{redis_key} #{expired_at}),
          ~w(HGETALL #{redis_key})
        ]) do
      {:ok, res} -> res
      {:error, _} -> raise AuthErrors.LoginError
    end

    %{
      username: username,
      user_role: user_role,
      auth_token: token,
      expired_at: expired_at * 1000
    }
  end


  @doc """
  Ensure this user is a logged in user
  """
  @spec ensure_logged_in_user(Plug.Conn) :: ensure_user_data
  def ensure_logged_in_user(conn) do
    token = get_token conn
    token_key = build_token_key token

    # find token from redis
    res = RedisPool.pipeline([
      ~w(HGET #{token_key} username),
      ~w(HGET #{token_key} userrole)
    ])

    res = case res do
            {:ok, res} -> res
            {:error, _} -> raise AuthErrors.UnauthorizedError
          end
    res = case res do
            [nil, _] -> raise AuthErrors.UnauthorizedError
            [_, nil] -> raise AuthErrors.UnauthorizedError
            result -> result
          end

    [username, user_role] = res
    %{
      username: username,
      user_role: user_role,
      auth_token: token
    }
  end


  @doc """
  Ensure this user is an admin user
  """
  @spec ensure_admin_user(Plug.Conn) :: ensure_user_data
  def ensure_admin_user(conn) do
    user_data = ensure_logged_in_user(conn)
    %{user_role: user_role} = user_data
    if user_role !== User.user_role_admin do
      raise AuthErrors.UnauthorizedError
    end

    user_data
  end


  @doc """
  Get the current user from the request
  """
  def get_current_user(conn) do
    token = get_token conn
    token_key = build_token_key token

    # find token from redis
    {:ok, res} = RedisPool.pipeline([
      ~w(HGET #{token_key} username),
      ~w(HGET #{token_key} userrole)
    ])

    case res do
      [nil, _] -> nil
      [_, nil] -> nil
      [username, user_role] -> %{
                               authenticated: true,
                               username: username,
                               user_role: user_role
                           }
    end
  end


  def logout(token) do
    token_key = build_token_key(token)
    {:ok, _} = RedisPool.pipeline([
      ~w(DEL #{token_key})
    ])
  end


  defp get_token(conn), do: Conn.get_req_header(conn, "tvgp-auth-token")

  defp build_token_key(token), do: "auth:#{token}"

end
