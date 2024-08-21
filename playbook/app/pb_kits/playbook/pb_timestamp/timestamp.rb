# frozen_string_literal: true

module Playbook
  module PbTimestamp
    class Timestamp < Playbook::KitBase
      include ActionView::Helpers::DateHelper
      prop :text
      prop :timestamp

      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :align,  type: Playbook::Props::Enum,
                    values: %w[left center right],
                    default: "left"
      prop :hide_updated, type: Playbook::Props::Boolean,
                          default: false
      prop :show_date, type: Playbook::Props::Boolean,
                       default: true
      prop :show_timezone, type: Playbook::Props::Boolean,
                           default: false
      prop :show_user, type: Playbook::Props::Boolean,
                       default: false
      prop :timezone, default: "America/New_York"
      prop :unstyled, type: Playbook::Props::Boolean,
                      default: false
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default elapsed updated],
                     default: "default"

      # Variables to use with pb_time_ago method
      SECS_PER_MIN  = 60
      SECS_PER_HOUR = 60 * SECS_PER_MIN
      SECS_PER_DAY  = 24 * SECS_PER_HOUR
      SECS_PER_WEEK = 7 * SECS_PER_DAY
      SECS_PER_MONTH = 4 * SECS_PER_WEEK
      SECS_PER_YEAR = 12 * SECS_PER_MONTH
      SECS_PER_CENT = 100 * SECS_PER_YEAR

      def classname
        generate_classname("pb_timestamp_kit", variant_class, align)
      end

      def timestamp_text
        case variant
        when "updated"
          format_updated_string
        when "elapsed"
          format_elapsed_string
        else
          show_date ? datetime_or_text : format_time_string
        end
      end

    private

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
        datetime_string = " on #{format_date_string} at #{format_time_string}"

        "Last updated#{user_string}#{datetime_string}"
      end

      def format_elapsed_string
        user_string = show_user ? " by #{text}" : ""
        datetime_string = " #{pb_time_ago(pb_date_time.convert_to_timestamp)} ago"
        datetime_string[1] = hide_updated ? datetime_string[1].upcase : datetime_string[1]
        updated_string = hide_updated ? "" : "Last updated"
        "#{updated_string}#{user_string}#{datetime_string}"
      end

      def pb_time_ago(value)
        time_ago = DateTime.now.to_i - value.to_i
        case time_ago
        when (0...SECS_PER_MIN)
          "a few seconds"
        when (SECS_PER_MIN...SECS_PER_HOUR)
          time = time_ago / SECS_PER_MIN
          time == 1 ? "a minute" : "#{time_ago / SECS_PER_MIN} minutes"
        when (SECS_PER_HOUR...SECS_PER_DAY)
          time = time_ago / SECS_PER_HOUR
          time == 1 ? "an hour" : "#{time_ago / SECS_PER_HOUR} hours"
        when (SECS_PER_DAY...SECS_PER_WEEK)
          time = time_ago / SECS_PER_DAY
          time == 1 ? "a day" : "#{time_ago / SECS_PER_DAY} days"
        when (SECS_PER_WEEK...SECS_PER_MONTH)
          time = time_ago / SECS_PER_WEEK
          time == 1 ? "a week" : "#{time_ago / SECS_PER_WEEK} weeks"
        when (SECS_PER_MONTH...SECS_PER_YEAR)
          time = time_ago / SECS_PER_MONTH
          time == 1 ? "a month" : "#{time_ago / SECS_PER_MONTH} months"
        when (SECS_PER_YEAR...SECS_PER_CENT)
          time = time_ago / SECS_PER_YEAR
          time == 1 ? "a year" : "#{time_ago / SECS_PER_YEAR} years"
        end
      end

      def datetime_or_text
        timestamp ? format_datetime_string : text
      end

      def pb_date_time
        Playbook::PbKit::PbDateTime.new(timestamp, timezone)
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
