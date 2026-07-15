# frozen_string_literal: true

module Playbook
  module PbDropdown
    class DropdownOption < Playbook::KitBase
      prop :option, type: Playbook::Props::HashProp
      prop :id, type: Playbook::Props::String

      def data
        Hash(prop(:data)).merge(
          "dropdown_option_disabled": disabled,
          "dropdown_option_label": option
        )
      end

      def classname
        "#{generate_classname('pb_dropdown_option', 'list')}#{disabled_class}"
      end

      def disabled
        option_value(:disabled) == true
      end

      def option_id
        option_value(:id)
      end

      def option_wrapper_class
        disabled ? "dropdown_option_wrapper disabled" : "dropdown_option_wrapper"
      end

    private

      def disabled_class
        disabled ? " disabled" : ""
      end

      def option_value(key)
        option[key] || option[key.to_s]
      end
    end
  end
end
