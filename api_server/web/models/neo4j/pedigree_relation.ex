defmodule ApiServer.Models.Neo4j.PedigreeRelation do

  ################################################################################
  # Errors
  defmodule LinkFamilyError do
    @moduledoc """
    Error when link family member
    """
    defexception message: "Cannot link family member"
  end

  ################################################################################
  # Code
  alias Neo4j.Sips, as: Neo4j

  def get_child_nodes(person_id) do
    query = """
    MATCH (p:Person {person_id: #{person_id}})-[r:Father_child|Mother_child]->(c:Person)
    RETURN c AS `child`
    """

    children = Neo4j.query!(Neo4j.conn, query)
    |> Enum.map(fn(child)->
      Map.get(child, "child")
    end)
  end

  def get_child_person_ids(person_id) do
    person_id
    |> get_child_nodes()
    |> Enum.map(fn(child)-> Map.get(child, "person_id") end)
  end

  def get_parent_nodes(person_id) do
    query = """
    MATCH (child:Person {person_id: #{person_id}})<-[relation:Father_child|Mother_child]-(parent:Person)
    RETURN type(relation) AS `type`, parent AS `node`
    """

    parents = Neo4j.query!(Neo4j.conn, query)
    parents = Enum.map(parents, fn(%{"type" => type, "node" => node}) ->
      Map.put(node, "type", type)
    end)

    parents
  end

  @doc """
  Link family nodes
  """
  def link_family(father_node, mother_node, child_node) do
    db_tasks = []
    %{id: child_node_id} = child_node

    db_tasks = if father_node do
      %{id: father_node_id} = father_node
      [link_father_child_async(father_node_id, child_node_id) | db_tasks]
    else
      db_tasks
    end

    db_tasks = if mother_node do
      %{id: mother_node_id} = mother_node
      [link_mother_child_async(mother_node_id, child_node_id) | db_tasks]
    else
      db_tasks
    end

    res = Task.yield_many(db_tasks)
    case res do
      [{_, {:ok, _}}, {_, {:ok, _}}] -> "OK"
      _ -> raise LinkFamilyError, message: "Cannot link family member"
    end
  end


  defp link_father_child_async(father_node_id, child_node_id) do
    query = """
    MATCH (father) WHERE id(father) = #{father_node_id}
    MATCH (child) WHERE id(child) = #{child_node_id}
    CREATE (father)-[:Father_child]->(child)
    """

    Task.async(fn ->
      Neo4j.query!(Neo4j.conn, query)
    end)
  end


  defp link_mother_child_async(mother_node_id, child_node_id) do
    query = """
    MATCH (mother) WHERE id(mother) = #{mother_node_id}
    MATCH (child) WHERE id(child) = #{child_node_id}
    CREATE (mother)-[:Mother_child]->(child)
    """

    Task.async(fn ->
      Neo4j.query!(Neo4j.conn, query)
    end)
  end



end
