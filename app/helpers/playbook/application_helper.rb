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

    def dark_mode
      if ENV["dark_mode"] == "true"
        true
      else
        false
      end
    end

    def dark_mode_props(props)
      if ENV["dark_mode"] == "true"
        props.merge(dark: dark_mode)
      elsif ENV["dark_mode"] == "false"
        props.merge(dark: dark_mode)
      else
        props
      end
    end
    
  end
end
