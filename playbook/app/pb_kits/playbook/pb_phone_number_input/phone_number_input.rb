# frozen_string_literal: true

module Playbook
  module PbPhoneNumberInput
    class PhoneNumberInput < Playbook::KitBase
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :initial_country, type: Playbook::Props::String,
                             default: ""
      prop :is_valid
      prop :label, type: Playbook::Props::String,
                   default: ""
      prop :name, type: Playbook::Props::String,
                  default: ""
      prop :onchange
      prop :only_countries, type: Playbook::Props::Array,
                            default: []
      prop :preferred_countries, type: Playbook::Props::Array,
                                 default: []
      prop :value, type: Playbook::Props::String,
                   default: ""

      def classname
        generate_classname("pb_phone_number_input")
      end

      def phone_number_input_options
        {
          id: id,
          disabled: disabled,
          initialCountry: initial_country,
          isValid: is_valid,
          label: label,
          name: name,
          onChange: onchange,
          onlyCountries: only_countries,
          preferredCountries: preferred_countries,
          value: value,
        }
      end
    end
  end
end
