# frozen_string_literal: true

class SamplesController < ApplicationController
  before_action :set_js
  before_action :set_sample, only: :show
  before_action :delete_dark_mode_cookie

  def index
    @show_sidebar = true
  end

  def show
    @show_sidebar = true
  end

private

  def current_sample_type
    params[:type].inquiry
  end
  helper_method :current_sample_type

  def set_sample
    @application_js.concat ["sample-show"]

    if SAMPLES.flatten(2).include?(params[:name])
      @sample = params[:name]
    else
      redirect_to "/samples", flash: { error: "That sample does not exist" }
    end
  end

  def set_js
    @application_js.concat ["samples"]
  end
end
