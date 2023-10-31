# frozen_string_literal: true

module PageVarsConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_page_vars
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
    @link_extension = File.basename(file)
    @front_matter = render_frontmatter(file)
    @page_title = @front_matter["title"] || File.basename(file, ".*").split(".")[0].tr("_", " ")
  end
end
