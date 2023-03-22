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
      prop :position, type: Playbook::Props::String,
                      default: "auto"
      prop :position_element, type: Playbook::Props::String
      prop :scroll_container, type: Playbook::Props::String
      prop :selection_type, type: Playbook::Props::Enum,
                            values: %w[week month quickpick none],
                            default: "none"
      prop :show_timezone, type: Playbook::Props::Boolean,
                           default: false
      prop :static_position, type: Playbook::Props::Boolean,
                             default: true
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :year_range, type: Playbook::Props::Array,
                        default: [1900, 2100]
      prop :start_date_element, type: Playbook::Props::String,
                                default: ::Date.current.strftime("%m/%d/%Y")

      prop :end_date_element, type: Playbook::Props::String,
                              default: ::Date.current.end_of_week.strftime("%m/%d/%Y")

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
          endDateElement: end_date_element,
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
          startDateElement: start_date_element,
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

      def date_ranges
        [today, yesterday, this_week, this_month, this_quarter, this_year, last_week, last_month, last_quarter, last_year]
      end

      def format_date(date)
        date.strftime("%m/%d/%Y")
      end

      def today
        {
          label: "Today",
          start_date: format_date(::Date.current),
          end_date: format_date(::Date.current),
        }
      end

      def yesterday
        {
          label: "Yesterday",
          start_date: format_date(::Date.current.yesterday),
          end_date: format_date(::Date.current.yesterday),
        }
      end

      def this_week
        {
          label: "This Week",
          start_date: format_date(::Date.current.beginning_of_week),
          end_date: format_date(::Date.current.end_of_week),
        }
      end

      def this_month
        {
          label: "This Month",
          start_date: format_date(::Date.current.beginning_of_month),
          end_date: format_date(::Date.current),
        }
      end

      def this_quarter
        {
          label: "This Quarter",
          start_date: format_date(::Date.current.beginning_of_quarter),
          end_date: format_date(::Date.current),
        }
      end

      def this_year
        {
          label: "This Year",
          start_date: format_date(::Date.current.beginning_of_year),
          end_date: format_date(::Date.current),
        }
      end

      def last_week
        {
          label: "Last Week",
          start_date: format_date(::Date.current.last_week.beginning_of_week),
          end_date: format_date(::Date.current.last_week.end_of_week),
        }
      end

      def last_month
        {
          label: "Last Month",
          start_date: format_date(::Date.current.last_month.beginning_of_month),
          end_date: format_date(::Date.current.last_month.end_of_month),
        }
      end

      def last_quarter
        {
          label: "Last Quarter",
          start_date: format_date(::Date.current.last_quarter.beginning_of_quarter),
          end_date: format_date(::Date.current.last_quarter.end_of_quarter),
        }
      end

      def last_year
        {
          label: "Last Year",
          start_date: format_date(::Date.current.last_year.beginning_of_year),
          end_date: format_date(::Date.current.last_year.end_of_year),
        }
      end
    end
  end
end
