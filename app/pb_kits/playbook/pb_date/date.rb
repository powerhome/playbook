# frozen_string_literal: true

module Playbook
  module PbDate
    class Date
      include ActionView::Helpers::TagHelper
      include ActionView::Context
      include Playbook::Props

      partial "pb_date/date"

      prop :date, required: true
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg sm xs],
                  default: "sm"

      def classname
        generate_classname("pb_date_kit")
      end

      def xs_date
        "#{pb_date_time.to_day_of_week.upcase} &middot; #{pb_date_time.to_month.upcase} #{pb_date_time.to_day}".html_safe
      end

      def lg_date
        "#{pb_date_time.to_month.upcase} #{pb_date_time.to_day}"
      end

      def sm_date
        "#{pb_date_time.to_day_of_week.upcase} &middot; #{pb_date_time.to_month.upcase} #{pb_date_time.to_day}".html_safe
      end

    private

      def pb_date_time
        Playbook::PbKit::PbDateTime.new(date)
      end
    end
  end
end
