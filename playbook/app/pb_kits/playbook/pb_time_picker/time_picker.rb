# frozen_string_literal: true

module Playbook
  module PbTimePicker
    class TimePicker < ::Playbook::KitBase
      prop :default_time, type: Playbook::Props::String
      prop :label, type: Playbook::Props::String,
                   default: "Time Picker"
      prop :show_timezone, type: Playbook::Props::Boolean,
                           default: false
      prop :time_format, type: Playbook::Props::Enum,
                         values: %w[AMPM 24hour],
                         default: "AMPM"
      prop :value, type: Playbook::Props::String

      def classname
        generate_classname("pb_time_picker")
      end

      def time_picker_react_props
        {
          defaultTime: default_time,
          id: id,
          label: label,
          showTimezone: show_timezone,
          timeFormat: time_format,
          value: value,
        }.compact
      end
    end
  end
end
