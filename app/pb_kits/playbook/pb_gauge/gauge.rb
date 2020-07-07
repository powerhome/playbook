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
      prop :subtitle, type: Playbook::Props::String, default: ""
      prop :units, type: Playbook::Props::String, default: ""
      prop :height, type: Playbook::Props::String, default: nil
      prop :tooltip_html, default: '<span style="font-weight: bold; color:{point.color};">●</span>
                                      {point.name}: ' + '<b>{point.y}
                                    </b>'
      prop :full_circle, type: Playbook::Props::Boolean, default: false
      prop :show_labels, type: Playbook::Props::Boolean, default: false
      prop :min, type: Playbook::Props::Numeric, default: 0
      prop :max, type: Playbook::Props::Numeric, default: 100

      def chart_data_formatted
        chart_data.map { |hash| hash[:y] = hash.delete :value }
        chart_data
      end

      def chart_options
        {
          id: id,
          chartData: chart_data_formatted,
          circumference: full_circle ? [0, 360] : [-100, 100],
          height: height,
          min: min,
          max: max,
          title: title,
          subtitle: subtitle,
          units: units,
          showLabels: show_labels,
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
