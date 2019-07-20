require_dependency "playbook/application_controller"
require 'yaml'

module Playbook
  class PagesController < ApplicationController
    before_action :set_kit, only: [:kit_show_rails, :kit_show_react]

    def home
    end

    def utilities
    end

    def tokens
    end

    def kits
      params[:type] ||= "rails"
      @type = params[:type]
    end

    def principles
    end

    def fullscreen
      render layout: "layouts/playbook/fullscreen"
    end

    def grid
      render layout: "layouts/playbook/grid"
    end

    def kit_show_rails
      render template: 'playbook/pages/kit_show'
    end

    def kit_show_react
      render template: 'playbook/pages/kit_show'
    end

  private

    def set_kit
      menu = MENU["kits"]
      unless menu.include?(params[:name])
        redirect_to root_path
      else
        @kit = params[:name]
      end
    end
  end
end
