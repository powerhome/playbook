# frozen_string_literal: true

module Playbook
  module PbIconStatValue
    class IconStatValue
      include Playbook::Props
      include ActionView::Helpers::NumberHelper

      partial "pb_icon_stat_value/icon_stat_value"

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

      prop :value, type: Playbook::Props::Numeric,
                   required: true


      def classname
        generate_classname("pb_icon_stat_value_kit", orientation, size, variant)
      end

      def value_unit
        [value.to_s, unit].join('')
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
    end
  end
end
