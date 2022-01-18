# frozen_string_literal: true

module Playbook
  module PbLegend
    class Legend < Playbook::KitBase
      prop :color, type: Playbook::Props::String,
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
