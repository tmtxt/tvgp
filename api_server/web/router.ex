defmodule ApiServer.Router do
  use ApiServer.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug ApiServer.LogTrace.HttpLogTrace
    plug Plug.Parsers,
      parsers: [:urlencoded, :multipart, :json],
      pass: ["*/*"],
      json_decoder: Poison
  end

  # Other scopes may use custom stacks.
  scope "/api", ApiServer do
    pipe_through :api

    get "/auth-users", AuthController, :get_user
    post "/auth-users", AuthController, :create_user
    post "/login", AuthController, :login
    post "/logout", AuthController, :logout
    post "/change-password", AuthController, :change_password

    get "/minor-contents/preface", MinorContentController, :get_preface
    post "/minor-contents/preface", MinorContentController, :set_preface
  end
end
