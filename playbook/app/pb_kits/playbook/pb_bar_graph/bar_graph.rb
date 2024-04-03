# frozen_string_literal: true

module Playbook
  module PbBarGraph
    class BarGraph < Playbook::KitBase
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left right center],
                   default: "center"
      prop :axis_title
      prop :axis_format
      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :custom_options, default: {}
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
      prop :colors, type: Playbook::Props::Array,
                    default: []
      prop :layout, type: Playbook::Props::Enum,
                    values: %w[horizontal vertical proximate],
                    default: "horizontal"
      prop :vertical_align, type: Playbook::Props::Enum,
                            values: %w[top middle bottom],
                            default: "bottom"
      prop :x, type: Playbook::Props::Numeric
      prop :y, type: Playbook::Props::Numeric

      def chart_type
        orientation == "horizontal" ? "bar" : "column"
      end

      def standard_options
        {
          align: align,
          id: id,
          className: classname,
          chartData: chart_data,
          dark: dark ? "dark" : "",
          type: chart_type,
          title: title,
          subTitle: subtitle,
          axisTitle: axis_title,
          axisFormat: axis_format,
          pointStart: point_start,
          xAxisCategories: x_axis_categories,
          yAxisMin: y_axis_min,
          yAxisMax: y_axis_max,
          legend: legend,
          toggleLegendClick: toggle_legend_click,
          height: height,
          colors: colors,
          layout: layout,
          verticalAlign: vertical_align,
          x: x,
          y: y,
        }
      end

      def chart_options
        standard_options.deep_merge(custom_options)
      end

      def classname
        generate_classname("pb_bar_graph")
      end
    end
  end
end
