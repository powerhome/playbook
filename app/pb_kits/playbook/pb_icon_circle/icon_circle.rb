# frozen_string_literal: true

module Playbook
  module PbIconCircle
    class IconCircle
      include Playbook::Props

      partial "pb_icon_circle/icon_circle"

      prop :icon, required: true
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md base lg xl],
                  default: "md"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default royal blue purple teal red yellow green],
                     default: "default"

      def classname
        generate_classname("pb_icon_circle_kit", size, variant)
      end
    end
  end
end
