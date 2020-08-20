# frozen_string_literal: true

module Playbook
  module PbDate
    class Date
      include ActionView::Helpers::TagHelper
      include ActionView::Context
      include Playbook::Props

      partial "pb_date/date"

      prop :date, required: true
      prop :alignment, type: Playbook::Props::Enum,
                       values: %w[left center right],
                       default: "left"
      prop :show_icon, type: Playbook::Props::Boolean,
                  default: false
      prop :show_day_of_week, type: Playbook::Props::Boolean,
                         default: false

      def classname
        generate_classname("pb_date_kit", alignment)
      end

      def date_day_of_week
        pb_date_time.to_day_of_week
      end

      def day
        pb_date_time.to_day
      end

      def month
        pb_date_time.to_month.camelcase
      end

      def year
        pb_date_time.to_year
      end

    private

      def pb_date_time
        Playbook::PbKit::PbDateTime.new(date)
      end
    end
  end
end
