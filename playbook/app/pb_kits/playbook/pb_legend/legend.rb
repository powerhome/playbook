# frozen_string_literal: true

module Playbook
  module PbLegend
    class Legend < Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: %w[data_1 data_2 data_3 data_4 data_5 data_6 data_7 success warning error info neutral primary],
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
