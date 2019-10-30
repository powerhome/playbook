# frozen_string_literal: true

module Playbook
  module PbDateRangeInline
    class DateRangeInline
      include ActionView::Helpers::TagHelper
      include ActionView::Context
      include Playbook::Props

      partial "pb_date_range_inline/date_range_inline"

      prop :end_date
      prop :start_date


      def classname
        generate_classname("pb_date_range_inline_kit", end_date_display, start_date_display)
      end

def end_date_display
        date_time = Playbook::PbKit::PbDateTime.new(end_date)
        content_tag(:time, datetime: date_time.to_iso) do
          "#{date_time.to_day} #{date_time.to_month_downcase} #{date_time.to_year}"
        end
      end

      def start_date_display
        date_time = Playbook::PbKit::PbDateTime.new(start_date)
        content_tag(:time, datetime: date_time.to_iso) do
          "#{date_time.to_day} #{date_time.to_month_downcase} #{date_time.to_year}"
        end
      end
    end
  end
end
