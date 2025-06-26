# frozen_string_literal: true

class PlaybookIconsController < ApplicationController
  before_action :delete_dark_mode_cookie

  def index
    @show_sidebar = true

    icon_data = JSON.parse(File.read(Rails.root.join("app/assets/icons.json")))
    @icons_by_category = icon_data.group_by { |icon| icon["category"] }

    @icon_categories = @icons_by_category.keys.sort.map do |cat|
      { text: cat, link: "##{cat.parameterize}" }
    end

    render template: "pages/playbook_icons"
  end
end
