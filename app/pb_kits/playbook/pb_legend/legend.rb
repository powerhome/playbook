# frozen_string_literal: true

module Playbook
  module PbLegend
    class Legend
      include Playbook::Props

      partial "pb_legend/legend"

      prop :color, type: Playbook::Props::Enum,
                   values: (1..7).map { |n| "data_#{n}" },
                   default: "data_1"
      prop :prefix_text
      prop :text, required: true

      def body_color
        dark ? "lighter" : "light"
      end

      def classname
        generate_classname("pb_legend_kit", color)
      end
    end
  end
end
