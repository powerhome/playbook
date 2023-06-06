# frozen_string_literal: true

module Playbook
  module PbPhoneNumberInput
    class PhoneNumberInput < Playbook::KitBase
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :initial_country, type: Playbook::Props::String,
                             default: ""
      prop :label, type: Playbook::Props::String,
                   default: ""
      prop :name, type: Playbook::Props::String,
                  default: ""
      prop :only_countries, type: Playbook::Props::Array,
                            default: []
      prop :preferred_countries, type: Playbook::Props::Array,
                                 default: []
      prop :error, type: Playbook::Props::String,
                   default: ""
      prop :value, type: Playbook::Props::String,
                   default: ""

      def classname
        generate_classname("pb_phone_number_input")
      end

      def phone_number_input_options
        {
          id: id,
          dark: dark,
          disabled: disabled,
          error: error,
          initialCountry: initial_country,
          label: label,
          name: name,
          onlyCountries: only_countries,
          preferredCountries: preferred_countries,
          required: required,
          value: value,
        }
      end
    end
  end
end
