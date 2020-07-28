# frozen_string_literal: true

module Playbook
  module PbCircleChart
    class CircleChart
      include Playbook::Props

      partial "pb_circle_chart/circle_chart"

      prop :chart_data, type: Playbook::Props::Array,
                        default: []
      prop :style, type: Playbook::Props::Enum,
                         values: %w[pie],
                         default: "pie"

      prop :data_labels, type: Playbook::Props::Boolean, default: false
      prop :min_point_size, type: Playbook::Props::Numeric
      prop :max_point_size, type: Playbook::Props::Numeric
      prop :inner_size, type: Playbook::Props::Enum,
                              values: %w[sm md lg none],
                              default: "md"
      prop :z_min, type: Playbook::Props::Numeric
      prop :start_angle, type: Playbook::Props::Numeric
      prop :header_format
      prop :data_label_html, default: '<div>{point.name}</div>'
      prop :tooltip_html, default: '<span style="font-weight: bold; color:{point.color};">●</span> 
                                      {point.name}: ' + '<b>{point.y}
                                    </b>'
      prop :use_html, type: Playbook::Props::Boolean, default: false
      prop :legend, type: Playbook::Props::Boolean, default: false
      prop :title, default: ''
      prop :rounded, type: Playbook::Props::Boolean, default: false
      prop :colors, type: Playbook::Props::Array,
                    default: []


      def chart_type
        style == "variablepie" ? "variablepie" : "pie"
      end

      def chart_data_formatted
        chart_data.map{ |hash| hash[:y] = hash.delete :value}
        return chart_data
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

      def color_variables
        colors.collect! do |color|
          case color
          when "data-1"
            "#0056cf"
          when "data-2"
            "#f9bb00"
          when "data-3"
            "#9e64e9"
          when "data-4"
            "#00ca74"
          when "data-5"
            "#fd804c"
          when "data-6"
            "#144075"
          when "data-7"
            "#00c4d7"
          when "data-8"
            "#ff2229"
          end
        end
      end

      def rounded_border_width
        rounded ? 20 : nil
      end

      def rounded_border_color
        rounded == true ? 'null' : nil
      end


      def chart_options
        {
          id: id,
          colors: color_variables,
          borderColor: rounded_border_color,
          borderWidth: rounded_border_width,
          chartData: chart_data_formatted,
          title: title,
          type: chart_type,
          showInLegend: legend,
          dataLabelHtml: data_label_html,
          dataLabels: data_labels,
          headerFormat: header_format,
          tooltipHtml: tooltip_html,
          useHTML: use_html,
          minPointSize: min_point_size,
          maxPointSize: max_point_size,
          innerSize: inner_size_format,
          zMin: z_min,
          startAngle: start_angle,
        }.to_json.html_safe
      end

      def classname
        generate_classname("pb_circle_chart")
      end
    end
  end
end
