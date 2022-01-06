# frozen_string_literal: true

module Playbook
  module PbIconStatValue
    class IconStatValue < Playbook::KitBase
      prop :icon, required: true

      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "sm"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default royal blue purple teal red yellow green],
                     default: "default"

      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"

      prop :unit, type: Playbook::Props::String,
                  default: ""

      prop :text, type: Playbook::Props::String,
                  default: ""

      prop :value, type: Playbook::Props::Numeric

      def classname
        generate_classname("pb_icon_stat_value_kit", orientation, size, variant)
      end

      def value_string
        value.to_s
      end

      def title_size
        # rubocop:disable Style/CaseLikeIf
        if size == "lg"
          1
        elsif size == "md"
          2
        else
          3
        end
        # rubocop:enable Style/CaseLikeIf
      end
    end
  end
end
