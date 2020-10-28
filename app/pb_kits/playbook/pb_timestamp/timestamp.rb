# frozen_string_literal: true

module Playbook
  module PbTimestamp
    class Timestamp
      include ActionView::Helpers::DateHelper
      include Playbook::Props

      partial "pb_timestamp/timestamp"

      prop :text
      prop :timestamp, required: true

      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :align,  type: Playbook::Props::Enum,
                    values: %w[left center right],
                    default: "left"
      prop :show_date, type: Playbook::Props::Boolean,
                       default: true
      prop :show_timezone, type: Playbook::Props::Boolean,
                           default: false
      prop :show_user, type: Playbook::Props::Boolean,
                       default: false
      prop :timezone, default: "America/New_York"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default elapsed updated],
                     default: "default"

      def classname
        generate_classname("pb_timestamp_kit", variant_class, align)
      end

      def format_year_string
        pb_date_time.to_year != DateTime.now.year.to_s ? ", #{pb_date_time.to_year}" : ""
      end

      def format_time_string
        "#{pb_date_time.to_hour}:#{pb_date_time.to_minutes}#{pb_date_time.to_meridian} #{format_timezone_string}".strip
      end

      def format_timezone_string
        timezone && show_timezone ? pb_date_time.to_timezone.to_s : ""
      end

      def format_date_string
        "#{pb_date_time.to_month_downcase} #{pb_date_time.to_unpadded_day}#{format_year_string}"
      end

      def format_datetime_string
        "#{format_date_string} &middot; #{format_time_string}".html_safe
      end

      def format_updated_string
        user_string = show_user ? " by #{text}" : ""

        case variant
        when "updated"
          datetime_string = " on #{format_date_string} at #{format_time_string}"
        when "elapsed"
          datetime_string = " #{time_ago_in_words(pb_date_time.convert_to_timestamp)} ago"
        end

        "Last updated#{user_string}#{datetime_string}"
      end

    private

      def pb_date_time
        Playbook::PbKit::PbDateTime.new(timestamp, timezone)
      end

      def dark_class
        dark ? "dark" : nil
      end

      def variant_class
        case variant
        when "updated"
          "updated"
        when "elapsed"
          "elapsed"
        end
      end
    end
  end
end
