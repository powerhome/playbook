# frozen_string_literal: true

module Playbook
  module PbDropdown
    class DropdownContainer < Playbook::KitBase
      prop :searchbar, type: Playbook::Props::Boolean,
                       default: false

      def classname
        generate_classname("pb_dropdown_container", "close", separator: " ")
      end

      def data
        Hash(prop(:data)).merge(dropdown_container: true)
      end
    end
  end
end
