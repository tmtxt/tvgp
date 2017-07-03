defmodule ApiServer.Router do
  use ApiServer.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug ApiServer.LogTrace.HttpLogTrace
    plug ApiServer.Plug.Params
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

    get "/trees", TreeController, :get_tree_from_default_root
    post "/trees/:person_id", TreeController, :get_tree_from_person

    get "/persons/:person_id", PersonController, :get_person_by_id

    get "/persons/:person_id/parents", PedigreeRelationController, :get_parents_by_person_id
  end
end
