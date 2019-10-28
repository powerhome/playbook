# frozen_string_literal: true

module Playbook
  module PbLineGraph
    class LineGraph
      include Playbook::Props

      partial "pb_line_graph/line_graph"

      prop :axis_title, type: Playbook::Props::String,
                        default: ""
      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :gradient, type: Playbook::Props::Boolean,
                      default: false
      prop :point_start, type: Playbook::Props::String,
                         default: ""
      prop :subtitle, type: Playbook::Props::String,
                      default: ""
      prop :title, type: Playbook::Props::String,
                   default: ""

      def chart_type
        gradient ? "area" : "line"
      end

      def classname
        generate_classname("pb_line_graph_kit")
      end
    end
  end
end
