defmodule ApiServer.TreeController do
  use ApiServer.Web, :controller
  alias ApiServer.Services.Tree, as: TreeService

  @doc """
  Get the tree from default root
  """
  def get_tree_from_default_root(conn, _params) do
    log_trace = conn.assigns.log_trace
    tree = TreeService.get_tree(log_trace)
    json(conn, tree)
  end


  def get_tree_from_person(conn, params) do
    log_trace = conn.assigns.log_trace

    %{"person_id" => person_id} = params
    person_id = String.to_integer(person_id)
    LogTrace.add(log_trace, :info, "get_tree_from_person", "From person id #{person_id}")

    tree = TreeService.get_tree(person_id, log_trace)
    json(conn, tree)
  end
end
