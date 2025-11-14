# frozen_string_literal: true

module Playbook
  module PbDateTimeStacked
    class DateTimeStacked < Playbook::KitBase
      prop :date, deprecated: true
      prop :date_time, type: Playbook::Props::Date,
                       default: ::DateTime.current
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :timezone, type: Playbook::Props::String,
                      default: "America/New_York"
      prop :show_current_year, type: Playbook::Props::Boolean,
                               default: false

      def date_time_value
        date || date_time
      end
    end
  end
end
