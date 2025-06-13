# frozen_string_literal: true

class PlaybookIconsController < ApplicationController
  before_action :delete_dark_mode_cookie

  def index
    @show_sidebar = true
    @icon_categories = [
      { text: "Alert", link: "#alert" },
      { text: "Animals", link: "#animals" },
      { text: "Arrows", link: "#arrows" },
      { text: "Awards", link: "#awards" },
      { text: "Buildings", link: "#buildings" },
      { text: "Business", link: "#business" },
      { text: "Checks", link: "#checks" },
      { text: "Clothing", link: "#clothing" },
      { text: "Communication", link: "#communication" },
      { text: "Data Visualization", link: "#data-visualization" },
      { text: "Education", link: "#education" },
      { text: "Files", link: "#files" },
      { text: "Flags", link: "#flags" },
      { text: "Hands", link: "#hands" },
      { text: "Health", link: "#health" },
      { text: "Interface Core", link: "#interface-core" },
      { text: "Location", link: "#location" },
      { text: "Media", link: "#media" },
      { text: "People", link: "#people" },
      { text: "Power Products", link: "#power-products" },
      { text: "Power Tooling", link: "#power-tooling" },
      { text: "Powergon", link: "#powergon" },
      { text: "Sales", link: "#sales" },
      { text: "Security", link: "#security" },
      { text: "Technology", link: "#technology" },
      { text: "Text", link: "#text" },
      { text: "Time", link: "#time" },
      { text: "Tools", link: "#tools" },
      { text: "Vehicles", link: "#vehicles" },
      { text: "Weather", link: "#weather" },
    ]

    render template: "pages/playbook_icons"
  end
end
