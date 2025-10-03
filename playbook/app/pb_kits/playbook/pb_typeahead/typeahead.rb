# frozen_string_literal: true

module Playbook
  module PbTypeahead
    class Typeahead < Playbook::KitBase
      prop :async, type: Playbook::Props::Boolean, default: false
      prop :default_options, type: Playbook::Props::HashArray, default: []
      prop :error, type: Playbook::Props::String,
                   default: ""
      prop :get_option_label
      prop :get_option_value
      prop :id
      prop :inline, type: Playbook::Props::Boolean,
                    default: false
      prop :label
      prop :load_options
      prop :multi_kit, type: Playbook::Props::String,
                       default: ""
      prop :name
      prop :options, type: Playbook::Props::HashArray,
                     default: []
      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}

      prop :is_multi, type: Playbook::Props::Boolean,
                      default: true

      prop :pills, type: Playbook::Props::Boolean,
                   default: false

      prop :placeholder
      prop :plus_icon, type: Playbook::Props::Boolean,
                       default: false
      prop :search_term_minimum_length, default: 3
      prop :search_debounce_timeout, default: 250
      prop :value
      prop :margin_bottom, type: Playbook::Props::Enum,
                           values: %w[none xxs xs sm md lg xl],
                           default: "sm"
      prop :pill_color, type: Playbook::Props::Enum,
                        values: %w[primary neutral success warning error info data_1 data_2 data_3 data_4 data_5 data_6 data_7 data_8 windows siding roofing doors gutters solar insulation accessories],
                        default: "primary"
      prop :required, type: Playbook::Props::Boolean,
                      default: false
      prop :validation, type: Playbook::Props::HashProp,
                        default: {}
      prop :wrapped, type: Playbook::Props::Boolean,
                     default: false
      prop :clear_on_context_change, type: Playbook::Props::Boolean,
                                     default: true
      prop :options_by_context, type: Playbook::Props::HashProp,
                                default: {}
      prop :search_context_selector, type: Playbook::Props::String,
                                     default: nil
      prop :disabled, type: Playbook::Props::Boolean,
                      default: false
      prop :preserve_search_input, type: Playbook::Props::Boolean,
                                   default: false

      def classname
        default_margin_bottom = margin_bottom.present? ? "" : " mb_sm"
        generate_classname("pb_typeahead_kit") + default_margin_bottom
      end

      def inline_class
        inline ? " inline" : ""
      end

      def data
        Hash(values[:data]).merge(
          pb_typeahead_kit: true,
          pb_typeahead_kit_search_term_minimum_length: search_term_minimum_length,
          pb_typeahead_kit_search_debounce_timeout: search_debounce_timeout,
          pb_typeahead_kit_clear_on_context_change: clear_on_context_change,
          pb_typeahead_kit_search_context_selector: search_context_selector,
          pb_typeahead_kit_options_by_context: options_by_context.to_json
        )
      end

      def is_react?
        pills || !is_multi || wrapped
      end

      def typeahead_react_options
        base_options = {
          className: classname,
          dark: dark,
          defaultValue: default_options,
          error: error,
          htmlOptions: html_options,
          id: id,
          inline: inline,
          isMulti: is_multi,
          label: label,
          marginBottom: margin_bottom,
          multiKit: multi_kit,
          name: name,
          options: options,
          pillColor: pill_color,
          placeholder: placeholder,
          plusIcon: plus_icon,
          truncate: truncate,
          wrapped: wrapped,
          required: required,
          validation: validation,
          searchContextSelector: search_context_selector,
          optionsByContext: options_by_context,
          clearOnContextChange: clear_on_context_change,
          disabled: disabled,
          preserveSearchInput: preserve_search_input,
        }

        base_options[:getOptionLabel] = get_option_label if get_option_label.present?
        base_options[:getOptionValue] = get_option_value if get_option_value.present?
        if async
          base_options[:async] = true
          base_options[:loadOptions] = load_options
        end
        base_options
      end
    end
  end
end
