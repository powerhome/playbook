# frozen_string_literal: true

module Playbook
  module PbDatePicker
    class DatePicker < Playbook::KitBase
      prop :allow_input, type: Playbook::Props::Boolean,
                         default: false
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :default_date, type: Playbook::Props::String,
                          default: ""
      prop :disable_date, type: Playbook::Props::Array,
                          default: []
      prop :disable_input, type: Playbook::Props::Boolean,
                           default: false
      prop :disable_range, type: Playbook::Props::Array,
                           default: []
      prop :disable_weekdays, type: Playbook::Props::Array,
                              default: []
      prop :enable_time, type: Playbook::Props::Boolean,
                         default: false
      prop :error, type: Playbook::Props::String
      prop :format, type: Playbook::Props::String,
                    default: "m/d/Y"
      prop :hide_icon, type: Playbook::Props::Boolean,
                       default: false
      prop :hide_label, type: Playbook::Props::Boolean,
                        default: false
      prop :inline, type: Playbook::Props::Boolean,
                    default: false
      prop :label, type: Playbook::Props::String,
                   default: "Date Picker"
      prop :input_aria, type: Playbook::Props::Hash,
                        default: {}
      prop :input_data, type: Playbook::Props::Hash,
                        default: {}
      prop :max_date, type: Playbook::Props::String
      prop :min_date, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String
      prop :mode, type: Playbook::Props::String,
                  default: "single"
      prop :picker_id, type: Playbook::Props::String,
                       required: true
      prop :placeholder, type: Playbook::Props::String,
                         default: "Select Date"
      prop :plugins, type: Playbook::Props::Boolean,
                     default: false,
                     deprecated: true
      prop :position, type: Playbook::Props::String
      prop :position_element, type: Playbook::Props::String
      prop :scroll_container, type: Playbook::Props::String
      prop :selection_type, type: Playbook::Props::Enum,
                            values: %w[week month none],
                            default: "none"
      prop :show_timezone, type: Playbook::Props::Boolean,
                           default: false
      prop :static_position, type: Playbook::Props::Boolean,
                             default: true
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :year_range, type: Playbook::Props::Array,
                        default: [1900, 2100]

      def classname
        generate_classname("pb_date_picker_kit")
      end

      def date_picker_config
        {
          allowInput: allow_input,
          defaultDate: default_date,
          disableDate: disable_date,
          disableRange: disable_range,
          disableWeekdays: disable_weekdays,
          enableTime: enable_time,
          format: format,
          hideIcon: hide_icon,
          inline: inline,
          maxDate: max_date,
          minDate: min_date,
          mode: mode,
          pickerId: picker_id,
          plugins: plugins,
          position: position,
          positionElement: position_element,
          required: required,
          selectionType: selection_type,
          showTimezone: show_timezone,
          staticPosition: static_position,
          yearRange: year_range,
        }.to_json.html_safe
      end

      def error_class
        error ? " error" : ""
      end

      def icon_wrapper_class
        class_string = "cal_icon_wrapper"
        class_string += " dark" if dark
        class_string += " no_label_shift" if hide_label
        class_string += error_class
        class_string
      end
    end
  end
end
