# frozen_string_literal: true

module Playbook
  module PbDateRangeStacked
    class DateRangeStacked
      include Playbook::Props

      partial "pb_date_range_stacked/date_range_stacked"

      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :end_date, type: Playbook::Props::Date, required: true
      prop :start_date, type: Playbook::Props::Date, required: true

      def year(date)
        as_date(date).to_year
      end

      def day_month(date)
        "#{as_date(date).to_day.strip} #{as_date(date).to_month}"
      end

      def classname
        generate_classname("pb_date_range_stacked")
      end
      
    private

      def as_date(date)
        Playbook::PbKit::PbDateTime.new(date)
      end
    end
  end
end
