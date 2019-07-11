module Playbook
  module PbBarGraph 
    class BarGraph < Playbook::PbKit::Base
      PROPS = [
          :configured_classname,
          :configured_chart_data,
          :configured_title,
          :configured_subtitle,
          :configured_axis_title,
          :configured_point_start,
          :configured_orientation].freeze

      def initialize(
        chart_data: default_configuration,
        title: default_configuration,
        subtitle: default_configuration,
        axis_title: default_configuration,
        point_start: default_configuration,
        classname: default_configuration,
        orientation: default_configuration
      )
        self.configured_classname = classname
        self.configured_chart_data = chart_data
        self.configured_title = title
        self.configured_subtitle = subtitle
        self.configured_axis_title = axis_title
        self.configured_point_start = point_start
        self.configured_orientation = orientation
      end

      def orientation 
        orientation_options = %w(vertical horizontal)
        one_of_value(configured_orientation, orientation_options, "vertical")
      end

      def chart_type
        case self.orientation 
        when "vertical"
          "column"
        when "horizontal"
          "bar" 
        else
          "column"
        end
      end

      def title
        if configured_title == default_configuration
          ""
        else
          configured_title
        end
      end

      def subtitle
        if configured_subtitle == default_configuration
          ""
        else
          configured_subtitle
        end
      end

      def axis_title
        if configured_axis_title == default_configuration
          ""
        else
          configured_axis_title
        end
      end

      def to_partial_path
        "pb_bar_graph/bar_graph"
      end

      def point_start
        if configured_point_start == default_configuration
          "2012"
        else
          configured_point_start
        end
      end

      def chart_data
        if configured_chart_data == default_configuration
          data = [{
              name: 'Installation',
              data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          }]
          return data.to_json.html_safe
        else
          configured_data.to_json.html_safe
        end
      end

      def self.options
        new_hash = PROPS.map { |e| e.to_s.remove("configured_") }
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
