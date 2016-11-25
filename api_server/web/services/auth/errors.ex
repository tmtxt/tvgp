defmodule ApiServer.Services.Auth.Errors do

  defmodule CreateUserError do
    @moduledoc """
    Exception raised when create user fail
    """
    import ApiServer.EctoUtil, only: [errors_to_map: 1]

    defexception plug_status: 400, changeset: nil

    def message(e) do
      %Ecto.Changeset{} = e.changeset
      changeset = e.changeset
    end
  end


  defmodule LoginError do
    @moduledoc """
    Exception raised when login fail
    """
    defexception message: "Username or password not match", plug_status: 401
  end


  defmodule UnauthorizedError do
    @moduledoc """
    Exception raised when user's not authorized for this action
    """
    defexception message: "Not authorized", plug_status: 403
  end


  defmodule NotLoggedInError do
    @moduledoc """
    Exception raised when user's not authorized for this action
    """
    defexception message: "Not login", plug_status: 401
  end
end
