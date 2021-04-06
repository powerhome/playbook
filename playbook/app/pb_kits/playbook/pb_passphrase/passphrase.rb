# frozen_string_literal: true

module Playbook
  module PbPassphrase
    class Passphrase < Playbook::KitBase
      prop :average_threshold
      prop :confirmation, type: Playbook::Props::Boolean, default: false
      prop :input_props, type: Playbook::Props::Hash, default: {}
      prop :label
      prop :min_length
      prop :show_tips_below
      prop :strong_threshold
      prop :tips, type: Playbook::Props::Array, default: []

      # prop :on_strength_change
      # might not need these?
      # prop :common
      # prop :on_change

      def classname
        generate_classname("pb_passphrase_kit")
      end

      def passphrase_options
        {
          dark: dark,
          id: id,
          averageThreshold: average_threshold,
          confirmation: confirmation,
          inputProps: input_props,
          label: label,
          minLength: min_length,
          showTipsBelow: show_tips_below,
          strongThreshold: strong_threshold,
          tips: tips,
          uncontrolled: true,
        }.compact
      end
    end
  end
end
