# frozen_string_literal: true

module Playbook
  module PbTreemapChart
    class TreemapChart < Playbook::KitBase
      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :colors, type: Playbook::Props::Array,
                    default: []
      prop :custom_options, default: {}
      prop :drillable, type: Playbook::Props::Boolean, default: false
      prop :grouped, type: Playbook::Props::Boolean, default: false
      prop :height
      prop :title, default: ""
      prop :tooltip_html, default: '<span style="font-weight: bold; color:{point.color};">&#9679; </span>
                                      {point.name}: ' + '<b>{point.value}
                                    </b>'

      def chart_type
        "treemap"
      end

      def standard_options
        {
          chartData: chart_data,
          className: classname,
          colors: colors,
          dark: dark ? "dark" : "",
          drillable: drillable,
          grouped: grouped,
          height: height,
          id: id,
          title: title,
          tooltipHtml: tooltip_html,
          type: chart_type,
        }
      end

      def chart_options
        standard_options.deep_merge(custom_options)
      end

      def classname
        generate_classname("pb_treemap_chart")
      end
    end
  end
end
