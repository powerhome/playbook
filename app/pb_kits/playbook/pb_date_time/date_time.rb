# frozen_string_literal: true

module Playbook
  module PbDateTime
    class DateTime
      include Playbook::Props

      partial "pb_date_time/date_time"

      prop :datetime, required: true
      prop :timezone, default: "America/New_York"
      prop :hide_week_day, type: Playbook::Props::Boolean, default: false
      prop :hide_clock_icon, type: Playbook::Props::Boolean, default: false
      prop :inline, type: Playbook::Props::Boolean, default: true
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :dark, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_datetime_kit", inline_class, align, dark_class)
      end

      def format_date
        common = "#{pb_date_time.to_month.capitalize} #{pb_date_time.to_day}"
        hide_week_day ? common : "#{pb_date_time.to_day_of_week.capitalize} &middot; #{common}".html_safe
      end

      def format_time
        "#{pb_date_time.to_hour}:#{pb_date_time.to_minutes}#{pb_date_time.to_meridian}"
      end

      def format_timezone
        pb_date_time.to_timezone.to_s
      end

      def pb_date_time
        Playbook::PbKit::PbDateTime.new(datetime)
      end

    private

      def inline_class
        inline ? "inline" : nil
      end

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
