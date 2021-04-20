# frozen_string_literal: true

module Playbook
  module PbTypeahead
    class Typeahead < Playbook::KitBase
      prop :async, type: Playbook::Props::Boolean, default: false
      prop :default_options, type: Playbook::Props::HashArray, default: []
      prop :get_option_label
      prop :get_option_value
      prop :id
      prop :label
      prop :load_options
      prop :name
      prop :options, type: Playbook::Props::HashArray, default: []
      prop :pills, type: Playbook::Props::Boolean, default: false
      prop :placeholder
      prop :search_term_minimum_length, default: 3
      prop :search_debounce_timeout, default: 250
      prop :value

      def classname
        generate_classname("pb_typeahead_kit")
      end

      def data
        Hash(values[:data]).merge(
          pb_typeahead_kit: true,
          pb_typeahead_kit_search_term_minimum_length: search_term_minimum_length,
          pb_typeahead_kit_search_debounce_timeout: search_debounce_timeout
        )
      end

      def typeahead_with_pills_options
        base_options = {
          dark: dark,
          defaultValue: default_options,
          id: id,
          isMulti: true,
          label: label,
          name: name,
          options: options,
          placeholder: placeholder,
        }

        base_options.merge!({ getOptionLabel: get_option_label }) if get_option_label.present?
        base_options.merge!({ getOptionValue: get_option_value }) if get_option_value.present?
        base_options.merge!({ async: true, loadOptions: load_options }) if async
        base_options
      end
    end
  end
end
