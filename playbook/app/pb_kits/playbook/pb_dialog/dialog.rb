# frozen_string_literal: true

module Playbook
  module PbDialog
    class Dialog
      include Playbook::Props

      partial "pb_dialog/dialog"

      prop :cancel_button
      prop :closeable, type: Playbook::Props::Boolean, default: true
      prop :confirm_button
      prop :oncancel
      prop :onchange
      prop :onclose
      prop :onconfirm
      prop :opened, type: Playbook::Props::Boolean, default: false
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg content],
                  default: "md"
      prop :text
      prop :title

      def dialog_options
        {
          id: id,
          className: classname,
          cancelButton: cancel_button,
          closeable: closeable,
          confirmButton: confirm_button,
          onCancel: oncancel,
          onChange: onchange,
          onClose: onclose,
          onConfirm: onconfirm,
          opened: opened,
          size: size,
          text: text,
          title: title,
        }
      end
    end
  end
end
