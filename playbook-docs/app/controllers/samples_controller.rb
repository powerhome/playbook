# frozen_string_literal: true

require_relative "application_controller"
require "yaml"

class SamplesController < ApplicationController
  before_action :set_sample, only: %i[sample_show_rails sample_show_react]
  helper SamplesHelper

  layout "playbook/samples"

  def samples
    params[:type] ||= "rails"
    @type = params[:type]
  end

  def samples_index
    @sample_yaml = YAML.load_file(Rails.root.join("config/samples.yml"))
    render layout: "layouts/playbook/application"
  end

  def sample_show_rails
    params[:type] ||= "rails"
    @type = params[:type]
    render template: "samples/sample_show"
  end

  def sample_show_react
    params[:type] ||= "react"
    @type = params[:type]
    render template: "samples/sample_show"
  end

private

  def set_sample
    sample_yaml = YAML.load_file(Rails.root.join("config/samples.yml"))
    if sample_yaml.flatten(2).include?(params[:name])
      @sample = params[:name]
    else
      redirect_to "/samples", flash: { error: "That sample does not exist" }
    end
  end
end
