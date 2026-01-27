# frozen_string_literal: true

module Playbook
  module PbTimePicker
    class TimePicker < ::Playbook::KitBase
      prop :default_time, type: Playbook::Props::String
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :error, type: Playbook::Props::String
      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}
      prop :label, type: Playbook::Props::String,
                   default: "Time Picker"
      prop :max_time, type: Playbook::Props::String
      prop :min_time, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :required_indicator, type: Playbook::Props::Boolean,
                                default: false
      prop :show_timezone, type: Playbook::Props::Boolean,
                           default: false
      prop :time_format, type: Playbook::Props::Enum,
                         values: %w[AMPM 24hour],
                         default: "AMPM"
      prop :validation_message, type: Playbook::Props::String,
                                default: ""
      prop :value, type: Playbook::Props::String

      def classname
        generate_classname("pb_time_picker") + error_class + disabled_class
      end

      def error_class
        error.present? ? " error" : ""
      end

      def disabled_class
        disabled ? " disabled" : ""
      end

      # Flatten nested data/aria hashes for React compatibility
      # Rails tag helpers do this automatically, but React needs flat attributes
      def formatted_input_options
        result = {}
        input_options.each do |key, value|
          if key.to_s == "data" && value.is_a?(Hash)
            value.each { |k, v| result["data-#{k.to_s.dasherize}"] = v }
          elsif key.to_s == "aria" && value.is_a?(Hash)
            value.each { |k, v| result["aria-#{k.to_s.dasherize}"] = v }
          else
            result[key] = value
          end
        end
        result
      end

      def time_picker_react_props
        props = {
          className: classname,
          data: data,
          defaultTime: default_time,
          disabled: disabled,
          error: error,
          htmlOptions: html_options,
          id: id,
          inputOptions: formatted_input_options,
          label: label,
          maxTime: max_time,
          minTime: min_time,
          name: name,
          required: required,
          requiredIndicator: required_indicator,
          showTimezone: show_timezone,
          timeFormat: time_format,
          validationMessage: validation_message,
          value: value,
        }
        props.compact
      end
    end
  end
end
