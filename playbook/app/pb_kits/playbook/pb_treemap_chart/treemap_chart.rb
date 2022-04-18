# frozen_string_literal: true

module Playbook
  module PbTreemapChart
    class TreemapChart < ::Playbook::KitBase
      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :subtitle
      prop :title
      prop :height
      prop :colors, type: Playbook::Props::Array,
                    default: []

      def chart_type
        "treemap"
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
