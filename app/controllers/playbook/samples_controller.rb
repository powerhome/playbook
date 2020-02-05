# frozen_string_literal: true

require_dependency "playbook/application_controller"
require "yaml"

module Playbook
  class SamplesController < ApplicationController
    layout "playbook/samples"
    def dashboards
      render template: "playbook/samples/dashboards/index"
    end
  end
end
