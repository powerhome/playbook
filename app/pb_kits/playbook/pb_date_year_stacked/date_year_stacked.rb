# frozen_string_literal: true

module Playbook
  module PbDateYearStacked
    class DateYearStacked
      include Playbook::Props

      partial "pb_date_year_stacked/date_year_stacked"

      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :date

      def year
        year = as_date.to_year
      end

      def day_month
        day_month = "#{as_date.to_day.strip} #{as_date.to_month}"
      end

      def classname
        generate_classname("pb_date_year_stacked", align)
      end

    private

      def as_date
        Playbook::PbKit::PbDateTime.new(date)
      end
    end
  end
end
