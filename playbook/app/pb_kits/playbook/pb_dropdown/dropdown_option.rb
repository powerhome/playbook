# frozen_string_literal: true

module Playbook
  module PbDropdown
    class DropdownOption < Playbook::KitBase
      prop :option, type: Playbook::Props::String

      def classname
        generate_classname("pb_dropdown_option", "list")
      end
    end
  end
end
