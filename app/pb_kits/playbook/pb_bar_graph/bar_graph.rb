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
      prop :point_start
      prop :subtitle
      prop :title

      def chart_type
        orientation == "horizontal" ? "bar" : "column"
      end

      def classname
        generate_classname("pb_bar_graph")
      end

      def sanitized_chart_data
        chart_data.to_json.html_safe
      end
    end
  end
end
