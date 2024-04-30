# frozen_string_literal: true

module Playbook
  module PbDropdown
    class DropdownOption < Playbook::KitBase
      def classname
        generate_classname("pb_dropdown_option")
      end
    end
  end
end
