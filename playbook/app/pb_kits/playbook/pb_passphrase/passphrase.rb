# frozen_string_literal: true

module Playbook
  module PbPassphrase
    class Passphrase < Playbook::KitBase
      prop :confirmation, type: Playbook::Props::Boolean, default: false
      prop :input_class, type: Playbook::Props::String
      prop :input_props, type: Playbook::Props::Hash, default: {}
      prop :label
      prop :show_tips_below, type: Playbook::Props::Enum,
                             values: %w[always xs sm md lg xl],
                             default: "always"
      prop :tips, type: Playbook::Props::Array, default: []
      prop :value, type: Playbook::Props::String

      def classname
        generate_classname("pb_passphrase", input_class)
      end

      def passphrase_options
        {
          input_class: input_class,
          dark: dark,
          id: id,
          confirmation: confirmation,
          inputProps: input_props,
          label: label,
          showTipsBelow: show_tips_below,
          tips: tips,
          uncontrolled: true,
          value: value,
        }.compact
      end
    end
  end
end
