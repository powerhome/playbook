# frozen_string_literal: true

module Playbook
  module PbDialog
    class Dialog < ::Playbook::KitBase
      prop :title
      prop :text
      prop :cancel_button
      prop :confirm_button
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg xl status_size content],
                  default: "md"

      def classname
        generate_classname("pb_dialog pb_dialog_sm pb_dialog_#{size}")
      end
    end
  end
end
