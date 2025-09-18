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
      prop :show_current_year, type: Playbook::Props::Boolean,
                               default: false
      prop :show_date, type: Playbook::Props::Boolean,
                       default: true
      prop :show_time, type: Playbook::Props::Boolean,
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
      SECS_FORTY_FIVE = 45
      SECS_PER_MIN  = 60
      SECS_PER_HOUR = 60 * SECS_PER_MIN # 3,600 seconds
      SECS_PER_DAY  = 24 * SECS_PER_HOUR # 86,400 seconds
      SECS_PER_WEEK = 7 * SECS_PER_DAY # 604,800 seconds
      SECS_PER_26 = 26 * SECS_PER_DAY # 26 days = 2,246,400 seconds
      SECS_PER_MONTH = 4 * SECS_PER_WEEK # 2,419,200 seconds
      SECS_PER_YEAR = 12 * SECS_PER_MONTH # 29,030,400 seconds
      SECS_PER_320 = 320 * SECS_PER_DAY # 320 days = 27,648,000 seconds
      SECS_PER_CENT = 100 * SECS_PER_YEAR # 3,153,600,000 seconds

      def classname
        generate_classname("pb_timestamp_kit", align)
      end

      def timestamp_text
        case variant
        when "updated"
          format_updated_string
        when "elapsed"
          format_elapsed_string
        else
          if show_date && show_time
            datetime_or_text
          elsif show_date && !show_time
            timestamp ? format_date_string : text
          elsif !show_date && show_time
            format_time_string
          else
            text
          end
        end
      end

    private

      def format_year_string
        pb_date_time.to_year != DateTime.now.year.to_s || show_current_year ? ", #{pb_date_time.to_year}" : ""
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
        if show_time
          "#{format_date_string} &middot; #{format_time_string}".html_safe
        else
          format_date_string
        end
      end

      def format_updated_string
        final_updated_string = []
        final_updated_string << "by #{text}" if show_user && text.present?
        if show_date && !show_time
          final_updated_string << format_date_string
        elsif show_date && show_time
          final_updated_string << "#{format_date_string} at #{format_time_string}"
        elsif show_time && !show_date
          final_updated_string << "at #{format_time_string}"
        end
        "Last updated #{final_updated_string.join(' ')}"
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
        when (0...SECS_FORTY_FIVE)
          "a few seconds"
        when (SECS_FORTY_FIVE...SECS_PER_MIN)
          "a minute"
        when (SECS_PER_MIN...SECS_PER_HOUR)
          time = time_ago / SECS_PER_MIN
          time == 1 ? "a minute" : "#{time_ago / SECS_PER_MIN} minutes"
        when (SECS_PER_HOUR...SECS_PER_DAY)
          time = time_ago / SECS_PER_HOUR
          time == 1 ? "an hour" : "#{time_ago / SECS_PER_HOUR} hours"
        when (SECS_PER_DAY...SECS_PER_WEEK)
          time = time_ago / SECS_PER_DAY
          time == 1 ? "a day" : "#{time_ago / SECS_PER_DAY} days"
        when (SECS_PER_WEEK...SECS_PER_26)
          time = time_ago / SECS_PER_WEEK
          time == 1 ? "a week" : "#{time_ago / SECS_PER_WEEK} weeks"
        when (SECS_PER_26...SECS_PER_MONTH)
          "a month"
        when (SECS_PER_MONTH...SECS_PER_320)
          time = time_ago / SECS_PER_MONTH
          time == 1 ? "a month" : "#{time_ago / SECS_PER_MONTH} months"
        when (SECS_PER_320...SECS_PER_YEAR)
          "a year"
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
