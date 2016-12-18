defmodule ApiServer.ErrorView do
  use ApiServer.Web, :view

  def render(_error, assigns) do
    message = Exception.message(assigns.reason)
    message
  end



  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, _assigns) do
    # render "500.html", assigns
    "Cannot encode error message"
  end
end
