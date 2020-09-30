# frozen_string_literal: true

module Playbook
  module PbDateRangeInline
    class DateRangeInline
      include ActionView::Helpers::TagHelper
      include ActionView::Context
      include Playbook::Props

      partial "pb_date_range_inline/date_range_inline"

      prop :end_date, type: Playbook::Props::Date, required: true
      prop :start_date, type: Playbook::Props::Date, required: true
      prop :icon, required: false
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm],
                  default: "sm"
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"

      def classname
        generate_classname("pb_date_range_inline_kit", align, size)
      end

      def text_kit
        case size
        when "xs"
          "caption"
        when "sm"
          "body"
        end
      end

      def icon_color
        size == "sm" ? "light" : nil
      end

      def dates_in_current_year?
        current_year = Time.current.year
        start_date.year == current_year && end_date.year == current_year
      end

      def time_display(time)
        content_tag(:time, datetime: time.to_iso) do
          if dates_in_current_year?
            "#{time.to_day} #{time.to_month_downcase}"
          else
            "#{time.to_day} #{time.to_month_downcase} #{time.to_year}"
          end
        end
      end

      def end_date_display
        time_display(Playbook::PbKit::PbDateTime.new(end_date))
      end

      def start_date_display
        time_display(Playbook::PbKit::PbDateTime.new(start_date))
      end
    end
  end
end
