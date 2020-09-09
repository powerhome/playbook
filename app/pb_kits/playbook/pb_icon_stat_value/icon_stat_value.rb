# frozen_string_literal: true

module Playbook
  module PbIconStatValue
    class IconStatValue
      include Playbook::Props
      include ActionView::Helpers::NumberHelper

      partial "pb_icon_stat_value/icon_stat_value"

      prop :icon

      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md base lg xl],
                  default: "md"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default royal blue purple teal red yellow green],
                     default: "default"

      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"
      prop :unit
      prop :text
      prop :value


      def classname
        generate_classname("pb_icon_stat_value_kit", orientation)
      end

      def value_unit
        value.to_s + unit
      end
    end
  end
end
