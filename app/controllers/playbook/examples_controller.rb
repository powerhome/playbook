# frozen_string_literal: true

require_dependency "playbook/application_controller"
require "yaml"

module Playbook
  class ExamplesController < ApplicationController
    def dashboards
      # render template: "playbook/examples/dashboards/dashboards", layout: "layouts/playbook/fullscreen"
    end
  end
end
