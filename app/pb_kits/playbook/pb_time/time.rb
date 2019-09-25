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
                 configured_time
                 configured_timestamp
                 configured_timezone].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     size: default_configuration,
                     time: default_configuration,
                     timestamp: default_configuration,
                     timezone: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
        self.configured_time = time
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
        if is_set? configured_time
          time = configured_time
        else
          time = configured_timestamp
        end
        Playbook::PbKit::PbDateTime.new(time, timezone_value)
      end

      def timezone_value
        default_value(configured_timezone, "America/New_York")
      end

      def format_time_string
        "#{timestamp.to_hour}:#{timestamp.to_minutes}#{timestamp.to_meridian}"
      end

      def timezone
        content_tag(:span, class: "pb_time_timezone") do
          timestamp.to_timezone.upcase
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
        content_tag(:time, datetime: timestamp.to_iso) do
          content_tag(:span) do
            format_time_string
          end +
            timezone
        end
      end

      def display_value_xs
        if is_set?(configured_timestamp) || is_set?(configured_time)
          pb_value = Playbook::PbBody::Body.new(color: "default") do
            text
          end
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def display_value_sm
        if is_set?(configured_timestamp) || is_set?(configured_time)
          pb_value = Playbook::PbBody::Body.new(color: "default") do
            icon +
              text
          end
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def display_value_lg
        if is_set?(configured_timestamp) || is_set?(configured_time)
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
