# frozen_string_literal: true

module Playbook
  module PbWeekdayStacked
    class WeekdayStacked
      include ActionView::Helpers::TagHelper
      include ActionView::Context
      include Playbook::Props

      partial "pb_weekday_stacked/weekday_stacked"

      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"

      prop :compact, type: Playbook::Props::Boolean,
                     default: false

      prop :dark, type: Playbook::Props::Boolean,
                  default: false

      prop :date, type: Playbook::Props::Date,
                  default: ::Date.current

      prop :day_only, type: Playbook::Props::Boolean,
                      default: false

      def classname
        generate_classname("pb_weekday_stacked_kit", align)
      end

      def day_of_week
        day = Playbook::PbKit::PbDateTime.new(date)
        formatted_day = compact ? day.to_day_of_week_compact : day.to_day_of_week
        content_tag(:time, datetime: day.to_iso) do
          formatted_day
        end
      end

      def formatted_month_and_day
        compact || day_only ? day : month_and_day
      end

    private

      def month_and_day
        month_and_day = Playbook::PbKit::PbDateTime.new(date)
        content_tag(:time, datetime: month_and_day.to_iso) do
          "#{month_and_day.to_unpadded_month_number}/#{month_and_day.to_unpadded_day}"
        end
      end

      def day
        day = Playbook::PbKit::PbDateTime.new(date)
        content_tag(:time, datetime: day.to_iso) do
          day.to_unpadded_day
        end
      end
    end
  end
end
