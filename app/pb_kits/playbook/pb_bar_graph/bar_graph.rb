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
      prop :point_start, type: Playbook::Props::Numeric
      prop :subtitle
      prop :title
      prop :x_axis_categories, type: Playbook::Props::Array,
                               default: []
      prop :y_axis_min, type: Playbook::Props::Numeric
      prop :y_axis_max, type: Playbook::Props::Numeric
      prop :legend, type: Playbook::Props::Boolean,
                    default: false
      prop :toggle_legend_click, type: Playbook::Props::Boolean,
                                 default: true
      prop :height

      def chart_type
        orientation == "horizontal" ? "bar" : "column"
      end

      def chart_options
        {
          id: id,
          className: classname,
          chartData: chart_data,
          type: chart_type,
          title: title,
          subtitle: subtitle,
          axisTitle: axis_title,
          pointStart: point_start,
          xAxisCategories: x_axis_categories,
          yAxisMin: y_axis_min,
          yAxisMax: y_axis_max,
          legend: legend,
          toggleLegendClick: toggle_legend_click,
          height: height,
        }
      end

      def classname
        generate_classname("pb_bar_graph")
      end
    end
  end
end
