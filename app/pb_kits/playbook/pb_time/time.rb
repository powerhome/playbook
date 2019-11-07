# frozen_string_literal: true

module Playbook
  module PbTime
    class Time
      include Playbook::Props

      partial "pb_time/time"

      prop :time
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm xs],
                  default: "sm"
      prop :timezone, default: "America/New_York"

      def classname
        generate_classname("pb_time_kit", size)
      end

      def format_time_string
        "#{pb_date_time.to_hour}:#{pb_date_time.to_minutes}#{pb_date_time.to_meridian}"
      end

      def format_timezone_string
        "#{pb_date_time.to_timezone}"
      end

    private

      def pb_date_time
        pb_date_time ||= Playbook::PbKit::PbDateTime.new(time, timezone)
      end
    end
  end
end
