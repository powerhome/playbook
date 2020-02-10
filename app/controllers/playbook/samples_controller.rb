# frozen_string_literal: true

require_dependency "playbook/application_controller"
require "yaml"

module Playbook
  class SamplesController < ApplicationController
    before_action :set_sample, only: %i[sample_show_rails sample_show_react]

    layout "playbook/samples"

    def samples
      params[:type] ||= "rails"
      @type = params[:type]
    end

    def sample_show_rails
      params[:type] ||= "rails"
      @type = params[:type]
      render template: "playbook/samples/sample_show"
    end

    def sample_show_react
      params[:type] ||= "react"
      @type = params[:type]
      render template: "playbook/samples/sample_show"
    end

  private

    def set_sample
      menu = MENU["samples"].map { |link| link.is_a?(Hash) ? link.first.last : link }
      if menu.flatten.include?(params[:name])
        @sample = params[:name]
      else
        redirect_to root_path, flash: { error: "That kit does not exist" }
      end
    end
  end
end
