# frozen_string_literal: true

module Playbook
  module PbDateRangeInline
    class DateRangeInline < Playbook::KitBase
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
      prop :show_current_year, type: Playbook::Props::Boolean,
                               default: false
      def classname
        generate_classname("pb_date_range_inline_kit", dark_class, align)
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
        include_year = show_current_year || !dates_in_current_year?
        content_tag(:time, datetime: time.to_iso) do
          if include_year
            "#{time.to_month_downcase} #{time.to_day}, #{time.to_year}"
          else
            "#{time.to_month_downcase} #{time.to_day}"
          end
        end
      end

      def end_date_display
        time_display(Playbook::PbKit::PbDateTime.new(end_date))
      end

      def start_date_display
        time_display(Playbook::PbKit::PbDateTime.new(start_date))
      end

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
