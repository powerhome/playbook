# frozen_string_literal: true

require_relative "application_controller"

class GuidesController < ApplicationController
  layout "docs"

  def create_kit; end

  def create_kit_md
    @name = params[:name]
    render template: "guides/create_kit/#{@name}"
  end

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

  def use_nitro; end
end
