# frozen_string_literal: true

module Playbook
  module PbCopyButton
    class CopyButton < ::Playbook::KitBase
      prop :text
      prop :tooltip_position,
           type: Playbook::Props::Enum,
           values: %w[top right bottom left],
           default: "top"
      prop :tooltip_text, type: Playbook::Props::String,
                          default: "Copied!"
      prop :value
      prop :from
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[button icon],
                     default: "icon"

      def classname
        generate_classname("pb_copy_button_kit")
      end

      def data
        Hash(values[:data]).merge(
          "copy-value": value,
          "from": from
        )
      end
    end
  end
end
