# frozen_string_literal: true

module Playbook
  module PbTime
    class Time < Playbook::PbKit::Base
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
        size == "lg" ? display_value_lg : display_value_sm
      end

      def kit_class
        kit_options = [
          "pb_time",
          size,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_time/time"
      end

    private

      def convert_to_timestamp(ts)
        ts.is_a?(String) ? DateTime.parse(ts) : ts
        ts.in_time_zone(timezone_value)
      end

      def hour
        if is_set? configured_timestamp
          timestamp = convert_to_timestamp(configured_timestamp)
          timestamp.strftime("%l")
        end
      end

      def minutes
        if is_set? configured_timestamp
          timestamp = convert_to_timestamp(configured_timestamp)
          timestamp.strftime("%M")
        end
      end

      def meridian
        if is_set? configured_timestamp
          timestamp = convert_to_timestamp(configured_timestamp)
          timestamp.strftime("%P")[0,1]
        end
      end

      def format_time_string
        format_time = "#{hour}:#{minutes}#{meridian}"
      end

      def timezone_value
        default_value(configured_timezone, "America/New_York")
      end

      def timezone_abbr
        timestamp = convert_to_timestamp(configured_timestamp)
        timestamp.strftime('%Z').upcase
      end

      def timezone
        if is_set? configured_timestamp
          "<span class='pb__time_timezone'>#{timezone_value}</span>".html_safe
        end
      end

      def size
        size_options = %w[lg sm]
        one_of_value(configured_size, size_options, "sm")
      end

      def icon
        pb_icon = Playbook::PbIcon::Icon.new(icon: "clock", fixed_width: true)
        ApplicationController.renderer.render(partial: pb_icon, as: :object)
      end

      def text
        "<span>#{format_time_string}</span> #{timezone_abbr}".html_safe if is_set? configured_timestamp
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
          pb_value_lg = Playbook::PbTitle::Title.new(size: 3, text: "#{format_time_string} #{timezone_abbr}".html_safe)
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
