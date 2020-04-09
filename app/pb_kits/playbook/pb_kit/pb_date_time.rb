# frozen_string_literal: true

module Playbook
  module PbKit
    class PbDateTime
      attr_accessor :value, :zone

      def initialize(value, zone = "America/New_York")
        @value = convert_to_timestamp_and_zone(value, zone)
      end

      def convert_to_timestamp_and_zone(value, zone)
        converted_time = value.is_a?(String) ? DateTime.parse(value) : value
        converted_time.in_time_zone(zone)
      end

      def convert_to_timestamp
        @value = @value.is_a?(String) ? DateTime.parse(@value) : @value
      end

      def convert_to_timezone(zone = "America/New_York")
        @value = @value.in_time_zone(zone)
      end

      def to_day_of_week
        @value.strftime("%a")
      end

      def to_year
        @value.strftime("%Y")
      end

      def to_month
        @value.strftime("%^b")
      end

      def to_month_downcase
        @value.strftime("%b")
      end

      def to_month_full
        @value.strftime("%B")
      end

      def to_day
        @value.strftime("%e")
      end

      def to_hour
        @value.strftime("%l")
      end

      def to_full_hour
        @value.strftime("%I")
      end

      def to_minutes
        @value.strftime("%M")
      end

      def to_meridian
        @value.strftime("%P")[0, 1]
      end

      def to_timezone
        @value.strftime("%Z")
      end

      def to_iso
        @value.iso8601
      end
    end
  end
end
