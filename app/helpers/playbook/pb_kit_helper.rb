# frozen_string_literal: true

require "webpacker/react/railtie" if defined?(Rails)
require "webpacker/react/helpers"
require "webpacker/react/component"

module Playbook
  module PbKitHelper
    def pb_rails(kit, props: {}, &block)
      previous = prefix_partial_path_with_controller_namespace
      self.prefix_partial_path_with_controller_namespace = false
      kit = build_view_model(kit, props, &block)
      render(partial: kit, as: :object)
    ensure
      self.prefix_partial_path_with_controller_namespace = previous
    end

    def pb_react(kit, props: {}, options: {})
      ::Webpacker::React::Component.new(kit.camelize).render(props, options)
    end

  private

    def is_subkit?(kit)
      kit.match(%r{[/\\]})
    end

    def pb_camelize(string)
      string.to_s.tr(" ", "_").camelize
    end

    def build_view_model(kit, props, &block)
      folder = is_subkit?(kit) ? pb_camelize(kit.split("/")[0]) : pb_camelize(kit)
      item = is_subkit?(kit) ? pb_camelize(kit.split("/")[-1]) : pb_camelize(kit)
      "Playbook::Pb#{folder}::#{item}".safe_constantize.new(props, &block)
    end
  end
end
