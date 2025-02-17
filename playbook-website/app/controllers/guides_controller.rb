# frozen_string_literal: true

class GuidesController < ApplicationController
  layout :resolve_layout
  before_action :set_page_vars
  before_action :delete_dark_mode_cookie

  def md_doc
    @show_sidebar = true
    if @guide_exists
      if @page
        render template: "guides/#{@parent}/#{@page}"
      else
        render template: "guides/#{@parent}"
      end
    elsif @parent_not_found
      redirect_to root_path, flash: { error: "That doc does not exist" }
    else
      redirect_to "/guides/#{@parent}", flash: { error: "That doc does not exist" }
    end
  end

private

  def resolve_layout
    case @parent
    when "global_props"
      "global_props"
    else
      "docs"
    end
  end

  def set_page_vars
    puts "params: #{params}"
    @page       = params[:page]
    @parent     = params[:parent]
    search_path = File.join(Rails.root, "/app/views/guides/#{@parent}")
    @navigation = DOCS[:"#{@parent}"]
    file = if @page
             Dir.glob("#{Dir[search_path].first}/#{@page}*.md").first
           else
             Dir.glob("#{Dir[search_path].first}*.md").first
           end
    if file == "README.md"
      @parent_not_found = true
      @guide_exists = false
    elsif file
      @link_extension = File.basename(file)
      @front_matter = render_frontmatter(file)
      @page_title = @front_matter["title"] || File.basename(file, ".*").split(".")[0].tr("_", " ")
      @guide_exists = true
    else
      @guide_exists = false
    end
  end
end
