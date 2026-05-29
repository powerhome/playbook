# frozen_string_literal: true

module Playbook
  module PbTimePicker
    class TimePicker < ::Playbook::KitBase
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
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
        default_margin_bottom = margin_bottom.present? ? "" : " mb_sm"
        generate_classname("pb_time_picker") + default_margin_bottom + error_class + disabled_class + dark_class
      end

      def error_class
        error.present? ? " error" : ""
      end

      def disabled_class
        disabled ? " disabled" : ""
      end

      def dark_class
        dark ? " dark" : ""
      end

      def data
        Hash(prop(:data)).merge(
          pb_time_picker: true,
          validation_message: validation_message.presence,
          time_format: time_format,
          default_time: default_time,
          value: value,
          min_time: min_time,
          max_time: max_time,
          required: required ? "true" : nil,
          disabled: disabled ? "true" : nil,
          show_timezone: show_timezone ? "true" : nil,
          field_name: field_name
        ).compact
      end

      def picker_id
        id.presence || default_picker_id
      end

      def input_id
        "#{picker_id}-input"
      end

      def field_name
        name.presence || "#{picker_id}-time"
      end

      def container_class
        base = "pb_time_picker_container"
        time_format == "24hour" ? "#{base} pb_time_picker_container_24hour" : base
      end

      def meridiem_section?
        time_format == "AMPM"
      end

      def main_input_options
        merged = input_options.deep_dup
        merged[:autocomplete] = "off" unless merged.key?(:autocomplete)
        caret_style = "caret-color: transparent"
        merged[:style] = merged[:style].present? ? "#{merged[:style]}; #{caret_style}" : caret_style
        merged
      end

      # Flatten nested data/aria hashes for the main input element
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

    private

      def default_picker_id
        if label.present?
          label.downcase.gsub(/\s+/, "_").gsub(/[^a-z0-9_]/, "")
        else
          "time-picker"
        end
      end
    end
  end
end
