# frozen_string_literal: true

module Playbook
  module PbKitHelper
    include ::Playbook::PbFormsHelper

    def pb_rails(kit_name, props: {}, &block)
      kit = Playbook::KitResolver.resolve(kit_name.to_s)

      if respond_to? :render_component
        render_component kit.new(props, &block), &block
      else
        render kit.new(props, &block), &block
      end
    end
  end
end
