# frozen_string_literal: true

module Playbook
  module PbDropdown
    class DropdownTrigger < Playbook::KitBase
      prop :options, type: Playbook::Props::Array,
                     default: []
      prop :id, type: Playbook::Props::String,
                default: ""
      def classname
        generate_classname("pb_dropdown_trigger")
      end

      def trigger_wrapper_classes
        generate_classname("dropdown_trigger_wrapper", "select_only")
      end
    end
  end
end
