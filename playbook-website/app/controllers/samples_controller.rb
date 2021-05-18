# frozen_string_literal: true

require "yaml"

require_relative "application_controller"

class SamplesController < ApplicationController
  before_action :set_sample, only: :show
  before_action :delete_dark_mode_cookie

  layout "samples"

  def index; end

  def show; end

private

  def current_sample_type
    params[:type].inquiry
  end
  helper_method :current_sample_type

  def set_sample
    if SAMPLES.flatten(2).include?(params[:name])
      @sample = params[:name]
    else
      redirect_to "/samples", flash: { error: "That sample does not exist" }
    end
  end
end
