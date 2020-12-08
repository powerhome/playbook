# frozen_string_literal: true

module Playbook
  module ApplicationHelper
    include ::Webpacker::Helper
    include ::Webpacker::React::Helpers

    def current_webpacker_instance
      Playbook.webpacker
    end

    def dark_mode
      if cookies[:dark_mode] == "true"
        true
      else
        false
      end
    end

    def dark_mode_props(props)
      if cookies[:dark_mode] == "true"
        props.merge(dark: dark_mode)
      elsif cookies[:dark_mode] == "false"
        props.merge(dark: dark_mode)
      else
        props
      end
    end

  end
end
