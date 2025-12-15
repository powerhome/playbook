# frozen_string_literal: true

module Playbook
  module PbDialog
    class DialogHeader < Playbook::KitBase
      prop :title
      prop :closeable, type: Playbook::Props::Boolean,
                       default: true

      def classname
        generate_classname("dialog_header")
      end

      def sticky_header
        "dialog_sticky_header"
      end

      def times_icon
        "app/pb_kits/playbook/utilities/icons/times.svg"
      end
    end
  end
end
