# frozen_string_literal: true

class GuidesController < ApplicationController
  layout "docs"
  before_action :set_page_vars
  before_action :delete_dark_mode_cookie

  def md_doc
    @show_sidebar = true
    if @parent && @guide_exists
      if @page
        render template: "guides/#{@parent}/#{@page}"
      else
        render template: "guides/#{@parent}"
      end
    else
      redirect_to "/guides/#{@parent}", flash: { error: "That doc does not exist" }
    end
  end

private

  def set_page_vars
    @page       = params[:page]
    @parent     = params[:parent]
    search_path = File.join(Rails.root, "/app/views/guides/#{@parent}")
    @navigation = DOCS[:"#{@parent}"]
    file = if @page
             Dir.glob("#{Dir[search_path].first}/#{@page}*.md").first
           else
             Dir.glob("#{Dir[search_path].first}*.md").first
           end
    if file
      @link_extension = File.basename(file)
      @front_matter = render_frontmatter(file)
      @page_title = @front_matter["title"] || File.basename(file, ".*").split(".")[0].tr("_", " ")
      @guide_exists = true
    else
      @guide_exists = false
    end
  end
end
