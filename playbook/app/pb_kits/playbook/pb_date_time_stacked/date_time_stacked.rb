# frozen_string_literal: true

module Playbook
  module PbDateTimeStacked
    class DateTimeStacked < Playbook::KitBase
      prop :date, type: Playbook::Props::Date,
                  default: ::DateTime.current
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
    end
  end
end