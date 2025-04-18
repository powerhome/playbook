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
