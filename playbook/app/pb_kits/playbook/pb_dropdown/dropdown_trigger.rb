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

      def data
        Hash(prop(:data)).merge(dropdown_trigger: true)
      end

      def classname
        generate_classname("pb_dropdown_trigger")
      end

      def default_display_placeholder
        placeholder || "Select..."
      end

      def trigger_wrapper_classes
        generate_classname("dropdown_trigger_wrapper", "select_only")
      end
    end
  end
end
