# frozen_string_literal: true

module Playbook
  module PbTypeahead
    class Typeahead
      include Playbook::Props

      prop :async, type: Playbook::Props::Boolean,
                   default: false
      prop :label
      prop :load_options
      prop :name
      prop :options, type: Playbook::Props::HashArray, default: []
      prop :pills, type: Playbook::Props::Boolean,
                   default: false

      prop :placeholder
      prop :search_term_minimum_length, default: 3
      prop :search_debounce_timeout, default: 250
      prop :value

      partial "pb_typeahead/typeahead"

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
          isMulti: true,
          label: label,
          options: options,
          placeholder: placeholder,
        }

        if async
          base_options.merge!(
            {
              async: true,
              loadOptions: load_options,
            }
          )
        end

        base_options
      end
    end
  end
end
