# frozen_string_literal: true

require_dependency "playbook/application_controller"
require "yaml"

module Playbook
  class PagesController < ApplicationController
    before_action :set_kit, only: %i[kit_show_rails kit_show_react]

    def home; end

    def utilities; end

    def tokens; end

    def kits
      params[:type] ||= "rails"
      @type = params[:type]
    end

    def principles; end

    def dashboards
      render template: "playbook/pages/examples/dashboards/dashboards", layout: "layouts/playbook/fullscreen"
    end

    def fullscreen
      render layout: "layouts/playbook/fullscreen"
    end

    def grid
      render layout: "layouts/playbook/grid"
    end

    def kit_show_rails
      render template: "playbook/pages/kit_show"
    end

    def kit_show_react
      render template: "playbook/pages/kit_show"
    end

  private

    def set_kit
      menu = MENU["kits"]
      if menu.include?(params[:name])
        @kit = params[:name]
      else
        redirect_to root_path
      end
    end
  end
end
