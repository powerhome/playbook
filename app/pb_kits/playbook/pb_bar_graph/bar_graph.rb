# frozen_string_literal: true

module Playbook
  module PbBarGraph
    class BarGraph
      include Playbook::Props
      partial "pb_bar_graph/bar_graph"

      prop :axis_title
      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "vertical"
      prop :point_start, default: 0
      prop :subtitle
      prop :title
      prop :x_min, default: "null"
      prop :x_max, default: "null"
      prop :x_tick_interval, default: "undefined"
      prop :x_categories, type: Playbook::Props::Array,
                          default: []
      prop :y_min, default: "null"
      prop :y_max, default: "null"
      prop :y_tick_interval, default: "undefined"
      prop :y_categories, type: Playbook::Props::Array,
                          default: []

      def chart_type
        orientation == "horizontal" ? "bar" : "column"
      end

      def classname
        generate_classname("pb_bar_graph")
      end

      def sanitized_data(data)
        data.to_json.html_safe
      end

      def sanitized_x_categories
        x_categories.to_json.html_safe
      end

      def sanitized_y_categories
        y_categories.to_json.html_safe
      end
    end
  end
end
