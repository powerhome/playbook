# frozen_string_literal: true

module Playbook
  module PbKitHelper
    def pb_rails(kit, props: {}, &block)
      kit = build_view_model(kit.to_s, props, &block)
      render_component kit, &block
    end

  private

    def build_view_model(kit, props, &block)
      is_subkit = kit.match(%r{[/\\]})
      folder = is_subkit ? kit.split("/")[0] : kit
      item = is_subkit ? kit.split("/")[-1] : kit
      class_name = "Playbook::Pb#{folder.camelize}::#{item.camelize}"
      class_name.safe_constantize.new(props, &block)
    end
  end
end
