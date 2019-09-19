# frozen_string_literal: true

module Playbook
  module PbTime
    class Time < Playbook::PbKit::Base
      include ActionView::Helpers::TagHelper
      include ActionView::Context

      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_size
                 configured_timestamp
                 configured_timezone].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     size: default_configuration,
                     timestamp: default_configuration,
                     timezone: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
        self.configured_timestamp = timestamp
        self.configured_timezone = timezone
      end

      def display_value
        case size
        when "lg"
          display_value_lg
        when "sm"
          display_value_sm
        else
          display_value_xs
        end
      end

      def kit_class
        kit_options = [
          "pb_time_kit",
          size,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_time/time"
      end

    private

      def timestamp
        convert_to_timestamp(configured_timestamp)
      end

      def convert_to_timestamp(time)
        time.is_a?(String) ? DateTime.parse(time) : time
        time.in_time_zone(timezone_value)
      end

      def format_time_string
        "#{hour}:#{minutes}#{meridian}" if is_set? configured_timestamp
      end

      def hour
        timestamp.strftime("%l")
      end

      def minutes
        timestamp.strftime("%M")
      end

      def meridian
        timestamp.strftime("%P")[0, 1]
      end

      def timezone_value
        default_value(configured_timezone, "America/New_York")
      end

      def timezone_abbr
        timestamp.strftime("%Z").upcase
      end

      def timezone
        content_tag(:span, class: "pb_time_timezone") do
          timezone_abbr
        end
      end

      def size
        size_options = %w[lg sm xs]
        one_of_value(configured_size, size_options, "sm")
      end

      def icon
        pb_icon = Playbook::PbIcon::Icon.new(icon: "clock", fixed_width: true)
        ApplicationController.renderer.render(partial: pb_icon, as: :object)
      end

      def text
        content_tag(:time, datetime: timestamp.iso8601) do
          content_tag(:span) do
            format_time_string
          end +
            timezone
        end
      end

      def display_value_xs
        if is_set? configured_timestamp
          pb_value = Playbook::PbBody::Body.new(color: "default") do
            text
          end
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def display_value_sm
        if is_set? configured_timestamp
          pb_value = Playbook::PbBody::Body.new(color: "default") do
            icon +
              text
          end
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def display_value_lg
        if is_set? configured_timestamp
          pb_value_lg = Playbook::PbTitle::Title.new(size: 3, text: text)
          ApplicationController.renderer.render(partial: pb_value_lg, as: :object)
        end
      end

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
