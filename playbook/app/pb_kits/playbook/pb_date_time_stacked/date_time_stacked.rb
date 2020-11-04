# frozen_string_literal: true

module Playbook
  module PbDateTimeStacked
    class DateTimeStacked
      include Playbook::Props

      partial "pb_date_time_stacked/date_time_stacked"

      prop :date, type: Playbook::Props::Date,
                  default: ::DateTime.current
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
    end
  end
end
