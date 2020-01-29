# frozen_string_literal: true

module Playbook
  module PbTypeahead
    class Typeahead
      include Playbook::Props

      prop :label
      prop :name
      prop :placeholder
      prop :search_term_minimum_length, default: 3
      prop :search_debounce_timeout, default: 250

      partial "pb_typeahead/typeahead"

      def classname
        generate_classname("pb_typeahead_kit")
      end

      def data
        Hash(values[:data]).merge(
          pb_typeahead_kit: true,
          pb_typeahead_kit_search_term_minimum_length: search_term_minimum_length,
          pb_typeahead_kit_search_debounce_timeout: search_debounce_timeout,
        )
      end
    end
  end
end
