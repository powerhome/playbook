# frozen_string_literal: true

require_dependency "playbook/application_controller"
require "yaml"

module Playbook
  class PagesController < ApplicationController
    before_action :set_kit, only: %i[kit_show_rails kit_show_react]
    before_action :ensure_rails_kit_exists, only: %i[kit_show_rails]
    before_action :set_category, only: %i[kit_category_show_rails kit_category_show_react]

    def home; end

    def utilities; end

    def tokens; end

    def kits
      params[:type] ||= "react"
      @type = params[:type]
    end

    def principles; end

    def grid
      render layout: "layouts/playbook/grid"
    end

    def kit_show_rails
      render template: "playbook/pages/kit_show"
    end

    def kit_show_react
      render template: "playbook/pages/kit_show"
    end

    def kit_category_show_rails
      params[:type] ||= "rails"
      @type = params[:type]
      render template: "playbook/pages/kit_category_show"
    end

    def kit_category_show_react
      render template: "playbook/pages/kit_category_show"
    end

  private

    def set_category
      categories = MENU["kits"].map { |link| link.first.first if link.is_a?(Hash) }.compact
      @category = params[:name]
      if categories.flatten.include?(@category)
        @category_kits = MENU["kits"].map { |link| link.first.last if link.is_a?(Hash) && link.first.first == @category }.compact.flatten
        @kits = params[:name]
      else
        redirect_to root_path, flash: { error: "That kit does not exist" }
      end
    end

    def set_kit
      menu = MENU["kits"].map { |link| link.is_a?(Hash) ? link.first.last : link }
      if menu.flatten.include?(params[:name])
        @kit = params[:name]
      else
        redirect_to root_path, flash: { error: "That kit does not exist" }
      end
    end

    def ensure_rails_kit_exists
      # TODO: unsure why we cannot simply use the helpers that are included in ApplicationController - fix this
      erbfiles = File.join("**", "*.erb")
      kit_files = Dir.glob(erbfiles, base: "#{Playbook::Engine.root}/app/pb_kits/playbook/pb_#{@kit}/docs").present?
      redirect_to action: "kit_show_react" unless kit_files.present?
    end
  end
end
