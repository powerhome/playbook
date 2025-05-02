# frozen_string_literal: true

module Playbook
  module PbDropdown
    class Dropdown < Playbook::KitBase
      prop :options, type: Playbook::Props::Array,
                     default: []
      prop :label, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String
      prop :error, type: Playbook::Props::String
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :default_value
      prop :blank_selection, type: Playbook::Props::String,
                             default: ""
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default subtle],
                     default: "default"
      prop :separators, type: Playbook::Props::Boolean,
                        default: true
      prop :autocomplete, type: Playbook::Props::Boolean,
                          default: false

      def data
        Hash(prop(:data)).merge(pb_dropdown: true)
      end

      def classname
        generate_classname("pb_dropdown", variant, separators_class)
      end

    private

      def error_class
        error.present? ? " error" : ""
      end

      def input_default_value
        default_value.present? ? default_value.transform_keys(&:to_s)["id"] : ""
      end

      def separators_class
        separators ? nil : "separators_hidden"
      end

      def options_with_blank
        blank_selection.present? ? [{ id: "", value: "", label: blank_selection }] + options : options
      end
    end
  end
end
