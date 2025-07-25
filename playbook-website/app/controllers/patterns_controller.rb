# frozen_string_literal: true

require "will_paginate"
require "playbook/pagination_renderer"
require "will_paginate/array"
require "ostruct"

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

    # Required for table_filter_card pattern's pagination bars to appear
    if params[:name] == "table_filter_card"
      @users = Array.new(50) do |i|
        OpenStruct.new(
          id: i + 1,
          name: %w[Ashlee Nick Nida Justin Edward Elisa Gary Sam Aaron George][i % 10],
          title: %w[Nitro Producteer UX Engineer II Senior UX Engineer Director of User Experience Engineering UX Designer UX Engineer UX Engineer Associate Nitro Quality Ninja UX Engineer][i % 10],
          department: "Business Technology",
          branch: "Philadelphia",
          start_date: Date.new(2025, 1, 1) + i.days
        )
      end.paginate(page: params[:page], per_page: 10)
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
