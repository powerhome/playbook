# frozen_string_literal: true

module Playbook
  module PbDropdown
    class DropdownOption < Playbook::KitBase
      prop :option, type: Playbook::Props::HashProp
      prop :id, type: Playbook::Props::String

      def data
        Hash(prop(:data)).merge("dropdown_option_label": option)
      end

      def padding_helper
        " p_xs"
      end

      def classname
        generate_classname("pb_dropdown_option", "list") + padding_helper
      end
    end
  end
end
