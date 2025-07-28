# frozen_string_literal: true

class PatternsController < ApplicationController
  before_action :set_js
  before_action :set_pattern, only: :show
  before_action :delete_dark_mode_cookie

  def index
    @show_sidebar = true
    @patterns = PATTERNS["Patterns"]
  end

  def show
    @show_sidebar = true

    # Users array for Rails table_filter_card pattern
    if params[:name] == "table_filter_card"
      @users = [
        { id: 1, name: "Ashlee", title: "Nitro Producteer", department: "Business Technology", branch: "Philadelphia", start_date: Date.new(2025, 1, 1) },
        { id: 2, name: "Nick", title: "UX Engineer II", department: "Business Technology", branch: "Philadelphia", start_date: Date.new(2025, 1, 2) },
        { id: 3, name: "Nida", title: "Senior UX Engineer", department: "Business Technology", branch: "Philadelphia", start_date: Date.new(2025, 1, 3) },
        { id: 4, name: "Justin", title: "Director of User Experience Engineering", department: "Business Technology", branch: "Philadelphia", start_date: Date.new(2025, 1, 4) },
        { id: 5, name: "Edward", title: "UX Designer", department: "Business Technology", branch: "Philadelphia", start_date: Date.new(2025, 1, 5) },
        { id: 6, name: "Elisa", title: "UX Engineer", department: "Business Technology", branch: "Philadelphia", start_date: Date.new(2025, 1, 6) },
        { id: 7, name: "Gary", title: "UX Engineer", department: "Business Technology", branch: "Philadelphia", start_date: Date.new(2025, 1, 7) },
        { id: 8, name: "Sam", title: "UX Engineer", department: "Business Technology", branch: "Philadelphia", start_date: Date.new(2025, 1, 8) },
        { id: 9, name: "Aaron", title: "Associate Nitro Quality Ninja", department: "Business Technology", branch: "Philadelphia", start_date: Date.new(2025, 1, 9) },
        { id: 10, name: "George", title: "UX Engineer", department: "Business Technology", branch: "Philadelphia", start_date: Date.new(2025, 1, 10) },
      ]
    end
  end

  def icons
    @show_sidebar = true
  end

private

  def current_pattern_type
    params[:type].inquiry
  end
  helper_method :current_pattern_type

  def set_pattern
    @application_js.concat ["pattern-show"]
    pattern = PATTERNS["Patterns"].find { |p| p["link"] == params[:name] }

    if pattern
      @pattern = pattern
    else
      redirect_to "/patterns", flash: { error: "That pattern does not exist" }
    end
  end

  def set_js
    @application_js.concat ["patterns"]
  end
end
