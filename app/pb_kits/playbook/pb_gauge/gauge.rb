# frozen_string_literal: true

module Playbook
  module PbGauge
    class Gauge
      include Playbook::Props

      partial "pb_gauge/gauge"

      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :style, type: Playbook::Props::Enum,
                   values: %w[solidgauge],
                   default: "solidgauge"
      prop :title, type: Playbook::Props::String, default: ""
      prop :tooltip_html, default: '<span style="font-weight: bold; color:{point.color};">●</span>
                                      {point.name}: ' + '<b>{point.y}
                                    </b>'

      def chart_data_formatted
        chart_data.map { |hash| hash[:y] = hash.delete :value }
        chart_data
      end

      def chart_options
        {
          id: id,
          chartData: chart_data_formatted,
          title: title,
          style: style,
          tooltipHtml: tooltip_html,
          type: "gauge",
        }.to_json.html_safe
      end

      def classname
        generate_classname("pb_circle_chart")
      end
    end
  end
end
