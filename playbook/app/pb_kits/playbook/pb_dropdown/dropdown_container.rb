# frozen_string_literal: true

module Playbook
  module PbDropdown
    class DropdownContainer < Playbook::KitBase
      def classname
        generate_classname("pb_dropdown_container")
      end
    end
  end
end
