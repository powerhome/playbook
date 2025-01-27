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

      def classname
        generate_classname("pb_copy_button")
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
