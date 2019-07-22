module Playbook
  module PbBarGraph 
    class BarGraph < Playbook::PbKit::Base
      PROPS = [
          :configured_axis_title,
          :configured_classname,
          :configured_chart_data,
          :configured_id,
          :configured_title,
          :configured_subtitle,
          :configured_point_start,
          :configured_orientation].freeze

      def initialize(
        id: default_configuration, 
        chart_data: default_configuration,
        title: default_configuration,
        subtitle: default_configuration,
        axis_title: default_configuration,
        point_start: default_configuration,
        classname: default_configuration,
        orientation: default_configuration
      )
        self.configured_id = id
        self.configured_classname = classname
        self.configured_chart_data = chart_data
        self.configured_title = title
        self.configured_subtitle = subtitle
        self.configured_axis_title = axis_title
        self.configured_point_start = point_start
        self.configured_orientation = orientation
      end

      def orientation 
        orientation_options = %w[vertical horizontal]
        one_of_value(configured_orientation, orientation_options, "vertical")
      end

      def chart_type
        orientation == "horizontal" ? "bar" : "column"
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
        "pb_bar_graph/bar_graph"
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
