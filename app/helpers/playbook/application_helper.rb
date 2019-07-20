# frozen_string_literal: true

require "webpacker"
require "webpacker/react/railtie" if defined?(Rails)
require "webpacker/react/helpers"
require "webpacker/react/component"

module Playbook
  module ApplicationHelper
    include ::Webpacker::Helper
    include ::Webpacker::React::Helpers

    def current_webpacker_instance
      Playbook.webpacker
    end

    # def react_component(component_name, props = {}, options = {})
    #   ::Webpacker::React::Component.new(component_name).render(props, options)
    # end
  end
end
