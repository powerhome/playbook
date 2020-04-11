# frozen_string_literal: true

module Playbook
  module PbTimeStacked
    class TimeStacked
      include ActionView::Helpers::TagHelper
      include ActionView::Context
      include Playbook::Props
      include Playbook::Props

      partial "pb_time_stacked/time_stacked"

      prop :date, type: Playbook::Props::Time, required: true
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :classnames, type: Playbook::Props::String,
                        default: nil
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[body caption],
                 default: "body"

      def classname
        generate_classname("pb_time_stacked_kit", align, dark_class, classnames)
      end

      def day
        day = Playbook::PbKit::PbDateTime.new(date)
        content_tag(:time, datetime: day.to_iso) do
          day.to_day.to_s
        end
      end

      def month
        month = Playbook::PbKit::PbDateTime.new(date)
        content_tag(:time, datetime: month.to_iso) do
          month.to_month.to_s
        end
      end

      def format_time_string
        "#{pb_date_time.to_full_hour}:#{pb_date_time.to_minutes}#{pb_date_time.to_meridian}"
      end

      def format_timezone
        pb_date_time.to_timezone
      end

      def tag_classnames
        "pb_time_stacked_kit_#{tag}"
      end

    private

      def dark_class
        dark ? "dark" : nil
      end

      def pb_date_time
        Playbook::PbKit::PbDateTime.new(date)
      end
    end
  end
end
