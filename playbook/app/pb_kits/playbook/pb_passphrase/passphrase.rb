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
      prop :value, type: Playbook::Props::String

      def classname
        generate_classname("pb_passphrase")
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
    end
  end
end
