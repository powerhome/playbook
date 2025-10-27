# frozen_string_literal: true

module Playbook
  module PbDatePicker
    class DatePicker < Playbook::KitBase
      prop :allow_input, type: Playbook::Props::Boolean,
                         default: false
      prop :custom_quick_pick_dates, type: Playbook::Props::HashProp,
                                     default: {}
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
      prop :end_date_id, type: Playbook::Props::String,
                         default: "end_date_id"
      prop :end_date_name, type: Playbook::Props::String,
                           default: "end_date_name"
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
      prop :input_aria, type: Playbook::Props::HashProp,
                        default: {}
      prop :input_data, type: Playbook::Props::HashProp,
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
      prop :plugins,  type: Playbook::Props::Boolean,
                      default: false,
                      deprecated: true
      prop :position, type: Playbook::Props::String,
                      default: "auto"
      prop :position_element, type: Playbook::Props::String
      prop :scroll_container, type: Playbook::Props::String
      prop :selection_type, type: Playbook::Props::Enum,
                            values: %w[week month quickpick none],
                            default: "none"
      prop :show_timezone, type: Playbook::Props::Boolean,
                           default: false
      prop :start_date_id, type: Playbook::Props::String,
                           default: "start_date_id"
      prop :start_date_name, type: Playbook::Props::String,
                             default: "start_date_name"
      prop :static_position, type: Playbook::Props::Boolean,
                             default: true
      prop :this_ranges_end_today, type: Playbook::Props::Boolean,
                                   default: false
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :year_range, type: Playbook::Props::Array,
                        default: [1900, 2100]
      prop :custom_event_type, type: Playbook::Props::String,
                               default: ""
      prop :validation_message, type: Playbook::Props::String,
                                default: ""
      prop :controls_start_id, type: Playbook::Props::String,
                               default: ""
      prop :controls_end_id, type: Playbook::Props::String,
                             default: ""
      prop :sync_start_with, type: Playbook::Props::String,
                             default: ""
      prop :sync_end_with, type: Playbook::Props::String,
                           default: ""
      prop :cursor, type: Playbook::Props::String,
                    default: "pointer"

      def classname
        default_margin_bottom = margin_bottom.present? ? "" : " mb_sm"
        generate_classname("pb_date_picker_kit") + default_margin_bottom
      end

      def date_picker_config
        {
          allowInput: allow_input,
          customQuickPickDates: custom_quick_pick_dates,
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
          thisRangesEndToday: this_ranges_end_today,
          yearRange: year_range,
          controlsStartId: controls_start_id,
          controlsEndId: controls_end_id,
          syncStartWith: sync_start_with,
          syncEndWith: sync_end_with,
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

      def angle_down_path
        "app/pb_kits/playbook/utilities/icons/angle-down.svg"
      end
    end
  end
end
