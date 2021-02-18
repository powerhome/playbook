# frozen_string_literal: true

module Playbook
  module PbKitHelper
    def pb_rails(kit_name, props: {}, &block)
      kit = Playbook::KitResolver.resolve(kit_name.to_s)
      render_component kit.new(props, &block), &block
    end
  end
end
