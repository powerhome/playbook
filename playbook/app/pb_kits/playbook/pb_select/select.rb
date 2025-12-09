# frozen_string_literal: true

# rubocop:disable Style/StringConcatenation
require "action_view"

module Playbook
  module PbSelect
    class Select < Playbook::KitBase
      prop :attributes, type: Playbook::Props::HashProp,
                        default: {}
      prop :blank_selection
      prop :compact, type: Playbook::Props::Boolean, default: false
      prop :disabled, type: Playbook::Props::Boolean, default: false
      prop :error
      prop :include_blank
      prop :inline, type: Playbook::Props::Boolean, default: false
      prop :input_options, type: Playbook::Props::HashProp,
                           default: {}
      prop :label
      prop :multiple, type: Playbook::Props::Boolean, default: false
      prop :name
      prop :onchange
      prop :options, type: Playbook::Props::HashArray, required: false, default: []
      prop :show_arrow, type: Playbook::Props::Boolean, default: false
      prop :required, type: Playbook::Props::Boolean, default: false
      prop :validation_message, type: Playbook::Props::String, default: ""

      def classnames
        ([classname] + [inline_class, compact_class, show_arrow_class])
          .reject(&:empty?)
          .join(" ")
      end

      def all_attributes
        {
          id: id,
          prompt: blank_selection,
          disabled: disabled,
          required: required,
          multiple: multiple,
          onchange: onchange,
          include_blank: include_blank,
        }.merge(attributes).merge(input_options)
      end

      def classname
        generate_classname("pb_select", select_margin_bottom, separator: " ")
      end

      def inline_class
        inline ? "inline" : ""
      end

      def compact_class
        compact ? "compact" : ""
      end

      def show_arrow_class
        show_arrow ? "show_arrow" : ""
      end

      def select_wrapper_class
        "pb_select_kit_wrapper" + error_class
      end

      def select_margin_bottom
        margin.present? || margin_bottom.present? ? nil : "mb_sm"
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

      def angle_down_path
        "app/pb_kits/playbook/utilities/icons/angle-down.svg"
      end

      def data_attributes
        data = attributes[:data] || {}
        data.merge!("data-pb-select" => true)
        data.merge!("data-validation-message" => validation_message) if validation_message.present?
        data
      end

    private

      def error_class
        error ? " error" : ""
      end
    end
  end
end

# rubocop:enable Style/StringConcatenation
