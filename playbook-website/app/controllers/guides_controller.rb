# frozen_string_literal: true

class GuidesController < ApplicationController
  include PageVarsConcern
  layout "docs"
  before_action :set_page_vars

  def md_doc
    @show_sidebar = true
    session[:navigation] = @navigation
    if @parent
      if @page
        render template: "guides/#{@parent}/#{@page}"
      else
        render template: "guides/#{@parent}"
      end
    else
      redirect_to root_path, flash: { error: "That doc does not exist" }
    end
  end
end
