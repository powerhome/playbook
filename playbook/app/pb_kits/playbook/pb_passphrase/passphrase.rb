# frozen_string_literal: true

module Playbook
  module PbPassphrase
    class Passphrase < Playbook::KitBase
      prop :confirmation, type: Playbook::Props::Boolean, default: false
      prop :input_props, type: Playbook::Props::HashProp, default: {}
      prop :label
      prop :show_tips_below, type: Playbook::Props::Enum,
                             values: %w[always xs sm md lg xl],
                             default: "always"
      prop :tips, type: Playbook::Props::Array, default: []
      prop :required_indicator, type: Playbook::Props::Boolean, default: false
      prop :required, type: Playbook::Props::Boolean, default: false
      prop :min_length, type: Playbook::Props::Number
      prop :value, type: Playbook::Props::String

      def classname
        generate_classname("pb_passphrase")
      end

      def data
        Hash(values[:data]).merge(pb_passphrase: true)
      end

      def display_label
        return label if label.present?
        return "Confirm Passphrase" if confirmation

        "Passphrase"
      end

      def show_label?
        display_label.present?
      end

      def show_required_indicator?
        required_indicator || required
      end

      def show_tips?
        tips.present? && !confirmation
      end

      def tips_trigger_id
        @tips_trigger_id ||= "passphrase-tips-trigger-#{dom_id_suffix}"
      end

      def tips_tooltip_id
        @tips_tooltip_id ||= "passphrase-tips-tooltip-#{dom_id_suffix}"
      end

      def tips_button_class
        classes = %w[passphrase-popover passphrase-tips]
        classes << "show-below-#{show_tips_below}" unless show_tips_below == "always"
        classes.join(" ")
      end

      def text_input_props
        {
          dark: dark,
          data: text_input_data,
          margin_bottom: "none",
          classname: "passphrase-text-input",
          placeholder: "Enter a passphrase...",
          required: required,
          type: "password",
          value: value,
          input_options: merged_input_options,
        }.compact
      end

      def text_input_data
        input_props.with_indifferent_access.fetch(:data, {}).to_h
      end

      def passphrase_options
        {
          dark: dark,
          id: id,
          confirmation: confirmation,
          inputProps: input_props,
          label: label,
          requiredIndicator: required_indicator,
          showTipsBelow: show_tips_below,
          tips: tips,
          uncontrolled: true,
          value: value,
        }.compact
      end

    private

      def dom_id_suffix
        id.presence || object_id
      end

      def merged_input_options
        options = input_props.deep_dup.with_indifferent_access.except(:data)
        options[:class] = [options[:class], options.delete(:classname)].compact.join(" ").strip.presence
        options[:minlength] = min_length if min_length.present?
        options
      end
    end
  end
end
