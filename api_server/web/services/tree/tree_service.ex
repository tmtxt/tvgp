defmodule ApiServer.Services.Tree do
  alias ApiServer.Models.Neo4j.Person, as: NeoPerson

  def get_tree(from_person_id, log_trace \\ nil) do
    root_node_id = NeoPerson.find_node_from_person_id(from_person_id, log_trace)
  end

  def get_tree(nil, log_trace \\ nil) do
    root_node_id = NeoPerson.find_node_from_person_id(from_person_id, log_trace)
  end

  defp get_tree_from_node_id(root_node_id, log_trace) do

  end

end
