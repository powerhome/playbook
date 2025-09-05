# frozen_string_literal: true

module Playbook
  module PbTimeRangeInline
    class TimeRangeInline < Playbook::KitBase
      prop :start_time, required: true
      prop :end_time, required: true
      prop :alignment, type: Playbook::Props::Enum,
                       values: %w[left center right],
                       default: "left"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm xs],
                  default: "sm"
      prop :dark, default: false
      prop :icon, default: false
      prop :timezone, default: false

      def classname
        generate_classname("pb_time_range_inline_kit", alignment)
      end

      def format_start_time_string
        "#{pb_date_start_time.to_hour}:#{pb_date_start_time.to_minutes}#{pb_date_start_time.to_meridian}"
      end

      def format_start_timezone_string
        pb_date_start_time.to_timezone.to_s
      end

      def format_end_time_string
        "#{pb_date_end_time.to_hour}:#{pb_date_end_time.to_minutes}#{pb_date_end_time.to_meridian}"
      end

      def format_end_timezone_string
        pb_date_end_time.convert_to_timezone.to_timezone.to_s
      end

      def pb_date_start_time
        Playbook::PbKit::PbDateTime.new(start_time)
      end

      def pb_date_end_time
        Playbook::PbKit::PbDateTime.new(end_time)
      end

      def text_timezone_color
        return "light" if size == "sm"

        nil
      end

      def icon_color
        return "light" if size == "sm"

        nil
      end

      def text_kit
        case size
        when "xs"
          "caption"
        when "sm"
          "body"
        end
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
