# frozen_string_literal: true

module Playbook
  module PbCircleChart
    class CircleChart < Playbook::KitBase
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left right center],
                   default: "center"
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
      prop :data_label_html, default: "<div>{point.name}</div>"
      prop :tooltip_html, default: '<span style="font-weight: bold; color:{point.color};">●</span>
                                      {point.name}: ' + '<b>{point.y}
                                    </b>'
      prop :use_html, type: Playbook::Props::Boolean, default: false
      prop :legend, type: Playbook::Props::Boolean, default: false
      prop :title, default: ""
      prop :height
      prop :rounded, type: Playbook::Props::Boolean, default: false
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

      def chart_options
        {
          align: align,
          id: id,
          colors: colors,
          chartData: chart_data,
          dark: dark ? "dark" : "",
          title: title,
          height: height,
          type: style,
          legend: legend,
          dataLabelHtml: data_label_html,
          dataLabels: data_labels,
          headerFormat: header_format,
          tooltipHtml: tooltip_html,
          useHTML: use_html,
          minPointSize: min_point_size,
          maxPointSize: max_point_size,
          innerSize: inner_size,
          zMin: z_min,
          startAngle: start_angle,
          rounded: rounded,
          layout: layout,
          verticalAlign: vertical_align,
          x: x,
          y: y,
        }
      end

      def classname
        generate_classname("pb_circle_chart")
      end
    end
  end
end
