defmodule ApiServer.TreeController do
  use ApiServer.Web, :controller
  alias ApiServer.Services.Tree, as: TreeService

  @doc """
  Get the tree from default root
  Response the tree with id: "root"
  For tree structure, refer to TreeService.construct_tree
  """
  def get_tree_from_default_root(conn, _params) do
    log_trace = conn.assigns.log_trace
    tree = TreeService.get_tree(log_trace)
    |> Map.put(:id, "root")
    json(conn, tree)
  end


  @doc """
  Get the tree from custom person
  Response the tree with id: ^person_id
  For tree structure, refer to TreeService.construct_tree
  """
  def get_tree_from_person(conn, params) do
    log_trace = conn.assigns.log_trace

    person_id = params
    |> Map.get("person_id")
    |> String.to_integer()
    LogTrace.add(log_trace, :info, "get_tree_from_person", "From person id #{person_id}")

    tree = person_id
    |> TreeService.get_tree(log_trace)
    |> Map.put(:id, person_id)

    json(conn, tree)
  end
end
