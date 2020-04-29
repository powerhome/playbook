# frozen_string_literal: true

module Playbook
  module PbDonutChart
    class DonutChart
      include Playbook::Props

      partial "pb_donut_chart/donut_chart"

      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :style, type: Playbook::Props::Enum,
                         values: %w[variablepie pie],
                         default: "variablepie"

      prop :min_point_size, type: Playbook::Props::Numeric
      prop :max_point_size, type: Playbook::Props::Numeric
      prop :inner_size, type: Playbook::Props::Enum,
                              values: %w[sm md lg none],
                              default: "md"
      prop :z_min, type: Playbook::Props::Numeric
      prop :start_angle, type: Playbook::Props::Numeric
      prop :header_format
      prop :point_format
      prop :use_html, type: Playbook::Props::Boolean, default: false
      prop :title

      def chart_type
        style == "variablepie" ? "variablepie" : "pie"
      end

      def inner_size_format
        case inner_size
        when "lg"
          "85%"
        when "sm"
          "35%"
        when "none"
          "0%"
        when "md"
          "50%"
        end

      end

      def chart_options
        {
          id: id,
          title: title,
          chartData: chart_data,
          type: chart_type,
          headerFormat: header_format,
          pointFormat: point_format,
          useHTML: use_html,
          minPointSize: min_point_size,
          maxPointSize: max_point_size,
          innerSize: inner_size_format,
          zMin: z_min,
          startAngle: start_angle
        }.to_json.html_safe
      end

      def classname
        generate_classname("pb_donut_chart")
      end
    end
  end
end




