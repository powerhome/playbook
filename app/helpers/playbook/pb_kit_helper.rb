# frozen_string_literal: true

require "webpacker/react/railtie" if defined?(Rails)
require "webpacker/react/helpers"
require "webpacker/react/component"

module Playbook
  module PbKitHelper

    def pb_rails(kit, props: {}, &block)
      previous = prefix_partial_path_with_controller_namespace
      self.prefix_partial_path_with_controller_namespace = false
      kit = build_view_model(kit.to_s, dark_mode_props(props), &block)
      render(partial: kit, as: :object)
    ensure
      self.prefix_partial_path_with_controller_namespace = previous
    end

    def pb_react(kit, props:{dark: dark_mode}, options: {})
      ::Webpacker::React::Component.new(kit.camelize).render(props, options)
    end

  private
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

    def is_subkit?(kit)
      kit.match(%r{[/\\]})
    end

    def build_view_model(kit, props, &block)
      folder = is_subkit?(kit) ? kit.split("/")[0] : kit
      item = is_subkit?(kit) ? kit.split("/")[-1] : kit
      class_name = "Playbook::Pb#{folder.camelize}::#{item.camelize}"
      class_name.safe_constantize.new(props, &block)
    end
  end
end
