# frozen_string_literal: true

module Playbook
  module PbDropdown
    class DropdownContainer < Playbook::KitBase
      prop :searchbar, type: Playbook::Props::Boolean,
                       default: false
      prop :constrain_height, type: Playbook::Props::Boolean,
                              default: false

      def classname
        classes = %w[pb_dropdown_container close]
        classes << "constrain_height" if constrain_height
        generate_classname(*classes, separator: " ")
      end

      def data
        Hash(prop(:data)).merge(dropdown_container: true)
      end
    end
  end
end
