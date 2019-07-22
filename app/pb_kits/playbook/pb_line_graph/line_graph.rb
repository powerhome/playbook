module Playbook
  module PbLineGraph
    class LineGraph < Playbook::PbKit::Base
      PROPS = [ :configured_id,
                :configured_classname,
                :configured_chart_data,
                :configured_title,
                :configured_subtitle,
                :configured_axis_title,
                :configured_gradient,
                :configured_point_start].freeze

      def initialize(
        id: default_configuration,
        classname: default_configuration,
        chart_data: default_configuration,
        title: default_configuration,
        subtitle: default_configuration,
        axis_title: default_configuration,
        point_start: default_configuration,
        gradient: default_configuration
      )
        self.configured_id = id
        self.configured_classname = classname
        self.configured_title = title
        self.configured_subtitle = subtitle
        self.configured_axis_title = axis_title
        self.configured_chart_data = chart_data
        self.configured_point_start = point_start
        self.configured_gradient = gradient
      end

      def gradient 
        is_true? configured_gradient
      end

      def chart_type
        if gradient == true
          "area"
        else
          "line"
        end
      end

      def title
        default_value(configured_title, "")
      end

      def subtitle
        default_value(configured_subtitle, "")
      end

      def axis_title
        default_value(configured_axis_title, "")
      end

      def to_partial_path
        "pb_line_graph/line_graph"
      end

      def point_start
        default_value(configured_point_start, "")
      end

      def chart_data
        adjusted_value(configured_chart_data, configured_chart_data.to_json.html_safe, {})
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
