# frozen_string_literal: true

module Playbook
  module PbDatePicker
    class DatePicker
      include Playbook::Props

      partial "pb_date_picker/date_picker"

      prop :disable_date, type: Playbook::Props::Array,
                          default: []
      prop :disable_range, type: Playbook::Props::Array,
                           default: []
      prop :disable_weekdays, type: Playbook::Props::Array,
                              default: []
      prop :error, type: Playbook::Props::String
      prop :format, type: Playbook::Props::String,
                    default: "m/d/Y"
      prop :label, type: Playbook::Props::String,
                   default: "Date Picker"
      prop :max_date, type: Playbook::Props::String
      prop :min_date, type: Playbook::Props::String
      prop :mode, type: Playbook::Props::String,
                  default: "single"
      prop :picker_id, type: Playbook::Props::String

      def classname
        generate_classname("pb_date_picker")
      end

      def error_class
        error ? "error" : ""
      end
    end
  end
end
