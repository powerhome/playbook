# frozen_string_literal: true

module Playbook
  module ApplicationHelper
    include ::Webpacker::React::Helpers
    include ::Playbook::PbKitHelper

    def current_webpacker_instance
      Playbook.webpacker
    end

    def pb_rails(kit, props: {}, &block)
      super kit, props: dark_mode_props(props), &block
    end

    def pb_react(kit, props: {}, options: {})
      react_component kit.camelize, dark_mode_props(props), options
    end

  private

    def dark_mode_props(props)
      (props || {}).merge(dark: dark_mode?)
    end

    def dark_mode?
      cookies[:dark_mode].eql? "true"
    end
  end
end
