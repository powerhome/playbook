# frozen_string_literal: true

module Playbook
  module PbTimestamp
    class Timestamp
      include Playbook::Props

      partial "pb_timestamp/timestamp"

      prop :timestamp, required: true
      prop :show_date, type: Playbook::Props::Boolean, default: true

      prop :dark, type: Playbook::Props::Boolean,
                  default: false

      prop :align,  type: Playbook::Props::Enum,
                    values: %w[left center right],
                    default: "left"

      def classname
        generate_classname("pb_timestamp_kit", align, dark_class)
      end

      def format_year_string
        pb_date_time.to_year != DateTime.now.year.to_s ? ", #{pb_date_time.to_year}" : ""
      end

      def format_time_string
        "#{pb_date_time.to_hour}:#{pb_date_time.to_minutes}#{pb_date_time.to_meridian}"
      end

      def format_date_string
        "#{pb_date_time.to_month_downcase} #{pb_date_time.to_unpadded_day}#{format_year_string}"
      end

      def format_datetime_string
        "#{format_date_string} &middot; #{format_time_string}".html_safe
      end

    private

      def pb_date_time
        Playbook::PbKit::PbDateTime.new(timestamp)
      end

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
