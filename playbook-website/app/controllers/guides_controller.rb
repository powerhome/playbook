# frozen_string_literal: true

class GuidesController < ApplicationController
  layout "docs"

  def md_doc
    @page       = params[:page]
    @parent     = params[:parent]
    @page_title = @page || @parent
    search_path = File.join(Rails.root, "/app/views/guides/#{@parent}")
    @navigation = Dir.children(search_path).map { |f| File.basename(f, ".md") }.sort
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
