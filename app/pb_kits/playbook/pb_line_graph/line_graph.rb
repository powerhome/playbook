# frozen_string_literal: true

module Playbook
  module PbLineGraph
    class LineGraph
      include Playbook::Props

      partial "pb_line_graph/line_graph"

      prop :axis_title
      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :gradient, type: Playbook::Props::Boolean,
                      default: false
      prop :point_start, type: Playbook::Props::Numeric
      prop :subtitle
      prop :title
      prop :x_axis_categories, type: Playbook::Props::Array,
                                default:[]
      prop :y_axis_min, type: Playbook::Props::Numeric
      prop :y_axis_max, type: Playbook::Props::Numeric
      prop :legend, type: Playbook::Props::Boolean,
                    default: false
      prop :toggle_legend_click, type: Playbook::Props::Boolean,
                                 default: true
      prop :height

      def chart_type
        gradient ? "area" : "line"
      end

      def chart_options
        {
          id: id,
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
        }.to_json.html_safe
      end

      def classname
        generate_classname("pb_line_graph")
      end
    end
  end
end
