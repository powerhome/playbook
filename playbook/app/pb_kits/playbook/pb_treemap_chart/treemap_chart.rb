# frozen_string_literal: true

module Playbook
  module PbTreemapChart
    class TreemapChart < ::Playbook::KitBase
      prop :axis_title
      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "vertical"
      prop :subtitle
      prop :title
      prop :x_axis_categories, type: Playbook::Props::Array,
                               default: []
      prop :y_axis_min, type: Playbook::Props::Numeric
      prop :y_axis_max, type: Playbook::Props::Numeric
      prop :height
      prop :colors, type: Playbook::Props::Array,
                    default: []

      def chart_type
        orientation == "horizontal" ? "bar" : "column"
      end

      def chart_options
        {
          id: id,
          className: classname,
          chartData: chart_data,
          dark: dark ? "dark" : "",
          type: chart_type,
          title: title,
          subtitle: subtitle,
          axisTitle: axis_title,
          xAxisCategories: x_axis_categories,
          yAxisMin: y_axis_min,
          yAxisMax: y_axis_max,
          height: height,
          colors: colors,
        }
      end

      def classname
        generate_classname("pb_treemap_chart")
      end
    end
  end
end
