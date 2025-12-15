# frozen_string_literal: true

module Playbook
  module PbDropdown
    module QuickpickHelper
      class << self
        def get_quickpick_options(range_ends_today: false)
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

      private

        def format_date(date)
          date.strftime("%m/%d/%Y")
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
