class SnippetsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:show, :preview]
  layout :choose_layout

  def show
    @page = Page.find(params[:page_id])
  end

  def preview
    @size = params[:size] || "desktop"
    @page = Page.find(params[:page_id])
  end

  private

  def choose_layout
    if action_name == "show"
      "clean"
    else
      "preview"
    end
  end

end
