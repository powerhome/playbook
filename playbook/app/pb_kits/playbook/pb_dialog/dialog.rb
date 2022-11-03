# frozen_string_literal: true

module Playbook
  module PbDialog
    class Dialog < ::Playbook::KitBase
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg xl status_size content],
                  default: "md"

      def classname
        generate_classname("pb_dialog pb_dialog_#{size}")
      end
    end
  end
end
