class SnippetsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:show]
  layout 'clean'

  def show
    @page = Page.find(params[:page_id])
  end

end
