# frozen_string_literal: true

module Playbook
  module PbIconStatValue
    class IconStatValue < Playbook::KitBase
      prop :icon, required: true

      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "sm"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default royal blue purple teal red yellow green orange lighter],
                     default: "lighter"

      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"

      prop :unit, type: Playbook::Props::String,
                  default: ""

      prop :text, type: Playbook::Props::String,
                  default: ""

      prop :value

      def classname
        generate_classname("pb_icon_stat_value_kit", orientation, size, variant)
      end

      def value_string
        value.to_s
      end

      def title_size
        if size == "lg"
          1
        elsif size == "md"
          2
        else
          3
        end
      end

      def icon_margin_right
        orientation === "horizontal" && "sm"
      end

      def icon_margin_bottom
        orientation === "vertical" && "xs"
      end
    end
  end
end
