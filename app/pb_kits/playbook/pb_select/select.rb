# frozen_string_literal: true

require "action_view"

# label: STRING
# required: BOOL
# disabled: BOOL
# name: STRING
# blank_selection: STRING
# options: ARRAY
#   HASH
#     value: STRING
#     selected: BOOL
#     disabled: BOOL
#     value_text: STRING

module Playbook
  module PbSelect
    class Select
      include ActionView::Helpers::FormTagHelper
      include ActionView::Context
      include Playbook::Props

      partial "pb_select/select"

      prop :label
      prop :required, type: Playbook::Props::Boolean, default: false
      prop :disabled, type: Playbook::Props::Boolean, default: false
      prop :multiple, type: Playbook::Props::Boolean, default: false
      prop :name
      prop :onchange
      prop :include_blank
      prop :blank_selection
      prop :options, type: Playbook::Props::HashArray, required: false, default: []
      prop :dark, type: Playbook::Props::Boolean, default: false


      def classname
        generate_classname("pb_select", dark_class)
      end

      def options_to_array
        options.map { |option| [option[:value_text] || option[:value], option[:value]] }
      end


      def selected
        selections = options.map { |option| option[:value] if option[:selected] == true }.compact
        if selections.empty?
          nil
        else
          selections
        end
      end

      def disabled_options
        disabled_options = options.map { |option| option[:value] if option[:disabled] == true }.compact
        if disabled_options.empty?
          nil
        else
          disabled_options
        end
      end

      private

        def dark_class
          dark ? "dark" : nil
        end


    end
  end
end
