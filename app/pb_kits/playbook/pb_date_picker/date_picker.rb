# frozen_string_literal: true

module Playbook
  module PbDatePicker
    class DatePicker
      include Playbook::Props

      partial "pb_date_picker/date_picker"

      prop :default_date, type: Playbook::Props::String,
                          default: ""
      prop :disable_date, type: Playbook::Props::Array,
                          default: []
      prop :disable_range, type: Playbook::Props::Array,
                           default: []
      prop :disable_weekdays, type: Playbook::Props::Array,
                              default: []
      prop :error, type: Playbook::Props::String
      prop :format, type: Playbook::Props::String,
                    default: "m/d/Y"
      prop :hide_icon, type: Playbook::Props::Boolean,
                       default: false
      prop :hide_label, type: Playbook::Props::Boolean,
                        default: false
      prop :label, type: Playbook::Props::String,
                   default: "Date Picker"
      prop :max_date, type: Playbook::Props::String
      prop :min_date, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String
      prop :mode, type: Playbook::Props::String,
                  default: "single"
      prop :picker_id, type: Playbook::Props::String,
                       required: true
      prop :read_only, type: Playbook::Props::Boolean,
                       default: false
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :year_range, type: Playbook::Props::Array,
                        default: [1900, 2100]

      def classname
        generate_classname("pb_date_picker_kit")
      end

      def date_picker_config
        {
          defaultDate: default_date,
          disableDate: disable_date,
          disableRange: disable_range,
          disableWeekdays: disable_weekdays,
          format: format,
          hideIcon: hide_icon,
          maxDate: max_date,
          minDate: min_date,
          mode: mode,
          pickerId: picker_id,
          readOnly: read_only,
          yearRange: year_range,
        }.to_json.html_safe
      end

      def error_class
        error ? " error" : ""
      end
    end
  end
end
