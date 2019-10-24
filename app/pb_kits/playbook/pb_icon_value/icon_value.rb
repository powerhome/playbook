# frozen_string_literal: true

module Playbook
  module PbIconValue
    class IconValue
      include Playbook::Props

      partial "pb_icon_value/icon_value"

      prop :text, required: true
      prop :icon, required: true
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"

      def classname
        generate_classname("pb_icon_value_kit", align)
      end
    end
  end
end
