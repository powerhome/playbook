# frozen_string_literal: true

require_dependency "playbook/application_controller"
require "yaml"

module Playbook
  class SamplesController < ApplicationController
    before_action :set_playbook
    before_action :set_sample, only: %i[sample_show_rails sample_show_react]
    before_action :delete_dark_mode_cookie

    layout "playbook/samples"

    def set_playbook
      @playbook = true
    end

    def samples
      params[:type] ||= "rails"
      @type = params[:type]
    end

    def samples_index; end

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
      if SAMPLES.flatten(2).include?(params[:name])
        @sample = params[:name]
      else
        redirect_to "/samples", flash: { error: "That sample does not exist" }
      end
    end
  end
end
