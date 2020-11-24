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
  end
end
