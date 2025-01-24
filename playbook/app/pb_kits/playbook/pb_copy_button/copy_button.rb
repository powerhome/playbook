# frozen_string_literal: true

module Playbook
  module PbCopyButton
    class CopyButton < ::Playbook::KitBase
      prop :from
      prop :text
      prop :tooltip_position,
           type: Playbook::Props::Enum,
           values: %w[top right bottom left],
           default: "top"
      prop :tooltip_text
      prop :value

      def classname
        generate_classname("pb_copy_button")
      end
    end
  end
end
