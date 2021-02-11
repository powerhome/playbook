# frozen_string_literal: true

module Playbook
  module PbDateRangeStacked
    class DateRangeStacked < Playbook::KitBase
      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :end_date, type: Playbook::Props::Date, required: true
      prop :start_date, type: Playbook::Props::Date, required: true

      def classname
        generate_classname("pb_date_range_stacked")
      end
    end
  end
end
