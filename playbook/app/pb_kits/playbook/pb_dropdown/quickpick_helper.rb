# frozen_string_literal: true

module Playbook
  module PbDropdown
    module QuickpickHelper
      class << self
        def get_quickpick_options(range_ends_today: false, custom_quick_pick_dates: {})
          default_options = build_default_options(range_ends_today)

          # Handle custom_quick_pick_dates
          return default_options if custom_quick_pick_dates.blank?

          dates = custom_quick_pick_dates[:dates] || custom_quick_pick_dates["dates"]
          return default_options if dates.blank?

          custom_options = dates.map { |date_config| build_custom_option(date_config) }

          # Override logic
          override = custom_quick_pick_dates[:override]
          override = custom_quick_pick_dates["override"] if override.nil?

          if override == false
            default_options + custom_options
          else
            custom_options
          end
        end

      private

        def build_default_options(range_ends_today)
          today = Date.today
          yesterday = today - 1.day

          this_week_start_date = first_day_of_week(today)
          this_week_end_date = range_ends_today ? today : last_day_of_week(today)
          last_week_start_date = previous_week_start_date(today)
          last_week_end_date = previous_week_end_date(today)

          this_month_start_date = today.beginning_of_month
          this_month_end_date = range_ends_today ? today : today.end_of_month
          last_month_start_date = (today - 1.month).beginning_of_month
          last_month_end_date = (today - 1.month).end_of_month

          this_quarter_start_date = today.beginning_of_quarter
          this_quarter_end_date = range_ends_today ? today : today.end_of_quarter
          last_quarter_start_date = (today - 3.months).beginning_of_quarter
          last_quarter_end_date = (today - 3.months).end_of_quarter

          this_year_start_date = today.beginning_of_year
          this_year_end_date = range_ends_today ? today : today.end_of_year
          last_year_start_date = (today - 1.year).beginning_of_year
          last_year_end_date = (today - 1.year).end_of_year

          [
            { id: "quickpick-today", label: "Today", value: [today.to_s, today.to_s], formatted_start_date: format_date(today), formatted_end_date: format_date(today) },
            { id: "quickpick-yesterday", label: "Yesterday", value: [yesterday.to_s, yesterday.to_s], formatted_start_date: format_date(yesterday), formatted_end_date: format_date(yesterday) },
            { id: "quickpick-this-week", label: "This Week", value: [this_week_start_date.to_s, this_week_end_date.to_s], formatted_start_date: format_date(this_week_start_date), formatted_end_date: format_date(this_week_end_date) },
            { id: "quickpick-this-month", label: "This Month", value: [this_month_start_date.to_s, this_month_end_date.to_s], formatted_start_date: format_date(this_month_start_date), formatted_end_date: format_date(this_month_end_date) },
            { id: "quickpick-this-quarter", label: "This Quarter", value: [this_quarter_start_date.to_s, this_quarter_end_date.to_s], formatted_start_date: format_date(this_quarter_start_date), formatted_end_date: format_date(this_quarter_end_date) },
            { id: "quickpick-this-year", label: "This Year", value: [this_year_start_date.to_s, this_year_end_date.to_s], formatted_start_date: format_date(this_year_start_date), formatted_end_date: format_date(this_year_end_date) },
            { id: "quickpick-last-week", label: "Last Week", value: [last_week_start_date.to_s, last_week_end_date.to_s], formatted_start_date: format_date(last_week_start_date), formatted_end_date: format_date(last_week_end_date) },
            { id: "quickpick-last-month", label: "Last Month", value: [last_month_start_date.to_s, last_month_end_date.to_s], formatted_start_date: format_date(last_month_start_date), formatted_end_date: format_date(last_month_end_date) },
            { id: "quickpick-last-quarter", label: "Last Quarter", value: [last_quarter_start_date.to_s, last_quarter_end_date.to_s], formatted_start_date: format_date(last_quarter_start_date), formatted_end_date: format_date(last_quarter_end_date) },
            { id: "quickpick-last-year", label: "Last Year", value: [last_year_start_date.to_s, last_year_end_date.to_s], formatted_start_date: format_date(last_year_start_date), formatted_end_date: format_date(last_year_end_date) },
          ]
        end

        def build_custom_option(date_config)
          label = date_config[:label] || date_config["label"]
          value = date_config[:value] || date_config["value"]

          date_range = calculate_date_range(value)
          start_date = date_range[0]
          end_date = date_range[1]

          {
            id: "quickpick-#{label.downcase.gsub(/\s+/, '-')}",
            label: label,
            value: [format_value(start_date), format_value(end_date)],
            formatted_start_date: format_date(start_date),
            formatted_end_date: format_date(end_date),
          }
        end

        def calculate_date_range(value)
          # Parse date strings if value is an array
          if value.is_a?(Array)
            [parse_boundary(value[0]), parse_boundary(value[1])]
          else
            # Calculate date range from time_period and amount
            time_period = value[:time_period] || value["time_period"] || value[:timePeriod] || value["timePeriod"]
            amount = value[:amount] || value["amount"]

            end_date = Date.today
            start_date = calculate_start_date(time_period, amount, end_date)

            [start_date, end_date]
          end
        end

        def parse_boundary(date_str)
          date_str = date_str.to_s
          if string_has_explicit_time?(date_str)
            parse_datetime_string(date_str)
          else
            parse_date_string(date_str)
          end
        end

        def string_has_explicit_time?(value)
          value.match?(/[T\s]\d{1,2}:\d{2}/) || value.match?(/\d{1,2}:\d{2}\s*(AM|PM)/i)
        end

        def parse_date_string(date_str)
          # Handle US date format (MM/DD/YYYY) because Ruby's Date.parse defaults to European format (DD/MM/YYYY)
          if date_str.include?("/")
            Date.strptime(date_str, "%m/%d/%Y")
          else
            Date.parse(date_str)
          end
        end

        # Parses timed custom boundaries. Mirrors React parseQuickPickDateTime:
        # 1) US m/d/Y + time (optional :SS / AM|PM) → DateTime.civil (wall-clock)
        # 2) Offset-less YYYY-MM-DDTHH:MM:SS → DateTime.civil (wall-clock; not Time.parse)
        # 3) ISO with Z / ± offset → DateTime.iso8601 (absolute); emit uses civil fields
        # Unsupported timed strings raise — no process-TZ Time.parse fallback.
        # Date-only boundaries stay on parse_date_string (unchanged).
        def parse_datetime_string(date_str)
          trimmed = date_str.to_s.strip

          if (match = trimmed.match(%r{\A(\d{1,2})/(\d{1,2})/(\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?\z}i))
            month, day, year, hour, min, sec, meridiem = match.captures
            hour = hour.to_i
            min = min.to_i
            sec = (sec || 0).to_i
            if meridiem
              meridiem = meridiem.upcase
              hour = 0 if meridiem == "AM" && hour == 12
              hour += 12 if meridiem == "PM" && hour != 12
            end
            return DateTime.civil(year.to_i, month.to_i, day.to_i, hour, min, sec)
          end

          # Offset-less wall-clock ISO (same shape as WALL_CLOCK_ISO in quickpickDateSync.ts).
          if (match = trimmed.match(/\A(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?\z/))
            year, month, day, hour, min, sec = match.captures
            return DateTime.civil(year.to_i, month.to_i, day.to_i, hour.to_i, min.to_i, (sec || 0).to_i)
          end

          # Absolute ISO with Z or numeric offset (React: new Date(iso)).
          return DateTime.iso8601(trimmed) if trimmed.match?(/\A\d{4}-\d{2}-\d{2}T/) && trimmed.match?(/[Zz]|[+-]\d{2}:?\d{2}\z/)

          raise ArgumentError, "Unsupported QuickPick timed value: #{date_str.inspect}"
        end

        def calculate_start_date(time_period, amount, end_date)
          case time_period.to_s
          when "days"
            end_date - amount.days
          when "weeks"
            end_date - amount.weeks
          when "months"
            end_date - amount.months
          when "quarters"
            end_date - (amount * 3).months
          when "years"
            end_date - amount.years
          else
            raise ArgumentError, "Invalid time period: #{time_period}"
          end
        end

        # Date-only → m/d/Y (SOD/EOD applied at sync when enableTime).
        # Time/DateTime (explicit custom times, including intentional midnight) →
        # offset-less wall-clock (YYYY-MM-DDTHH:MM:SS). Customs are authored as local
        # wall-clock labels, not absolute instants — do not emit zone offsets.
        def format_date(date)
          if time_like?(date)
            date.strftime("%Y-%m-%dT%H:%M:%S")
          else
            date.strftime("%m/%d/%Y")
          end
        end

        def format_value(date)
          if time_like?(date)
            date.strftime("%Y-%m-%dT%H:%M:%S")
          else
            date.to_s
          end
        end

        def time_like?(date)
          date.is_a?(Time) || date.is_a?(DateTime) || defined?(ActiveSupport::TimeWithZone) && date.is_a?(ActiveSupport::TimeWithZone)
        end

        def format_date_range(start_date, end_date)
          "#{format_date(start_date)} - #{format_date(end_date)}"
        end

        def first_day_of_week(date)
          # Monday as first day of week
          date.beginning_of_week(:monday)
        end

        def last_day_of_week(date)
          # Sunday as last day of week
          date.end_of_week(:monday)
        end

        def previous_week_start_date(date)
          first_day_of_week(date) - 1.week
        end

        def previous_week_end_date(date)
          last_day_of_week(date) - 1.week
        end
      end
    end
  end
end
