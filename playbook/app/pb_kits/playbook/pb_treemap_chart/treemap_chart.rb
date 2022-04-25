# frozen_string_literal: true

module Playbook
  module PbTreemapChart
    class TreemapChart < ::Playbook::KitBase
      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :drillable
      prop :subtitle
      prop :title
      prop :height
      prop :colors, type: Playbook::Props::Array,
                    default: []
      prop :tooltip_html, default: '<span style="font-weight: bold; color:{point.color};">●</span>
                                      {point.name}: ' + '<b>{point.value}
                                    </b>'
      prop :grouped

      def chart_type
        "treemap"
      end

      def chart_options
        {
          id: id,
          className: classname,
          chartData: chart_data,
          drillable: drillable,
          dark: dark ? "dark" : "",
          type: chart_type,
          title: title,
          subtitle: subtitle,
          height: height,
          colors: colors,
          tooltipHtml: tooltip_html,
          grouped: grouped,
        }
      end

      def classname
        generate_classname("pb_treemap_chart")
      end
    end
  end
end
