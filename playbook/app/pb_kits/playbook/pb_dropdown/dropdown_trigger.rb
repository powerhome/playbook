# frozen_string_literal: true

module Playbook
  module PbDropdown
    class DropdownTrigger < Playbook::KitBase
      prop :options, type: Playbook::Props::Array,
                     default: []
      prop :id, type: Playbook::Props::String,
                default: ""
      prop :placeholder, type: Playbook::Props::String
      prop :custom_display
      prop :autocomplete, type: Playbook::Props::Boolean,
                          default: false
      prop :multi_select, type: Playbook::Props::Boolean,
                          default: false
      prop :select_id, type: Playbook::Props::String
      prop :label, type: Playbook::Props::String
      prop :error_id, type: Playbook::Props::String
      prop :error, type: Playbook::Props::String

      def data
        Hash(prop(:data)).merge(dropdown_trigger: true, dropdown_placeholder: default_display_placeholder)
      end

      def classname
        generate_classname("pb_dropdown_trigger")
      end

      def default_display_placeholder
        placeholder || "Select..."
      end

      def trigger_wrapper_classes
        generate_classname("dropdown_trigger_wrapper", ("select_only" unless autocomplete || multi_select))
      end
    end
  end
end
