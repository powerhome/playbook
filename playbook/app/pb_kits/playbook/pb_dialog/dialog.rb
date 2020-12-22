# frozen_string_literal: true

module Playbook
  module PbDialog
    class Dialog
      include Playbook::Props

      partial "pb_dialog/dialog"

      prop :aria?: object
      prop :cancelButton?: string
      prop :children: array<React.ReactNode> | React.ReactNode | string
      prop :className?: string
      prop :closeable: boolean
      prop :confirmButton?: string
      prop :data?: object
      prop :id?: string
      prop :onCancel?: () => void
      prop :onChange?: () => void
      prop :onClose?: () => void
      prop :onConfirm?: () => void
      prop :opened: boolean
      prop :size?: "sm" | "md" | "lg" | "content"
      prop :text?: string
      prop :title?: string

      def dialog_options
        {
          id: id,
          className: classname,
          focus: focus,
          simple: simple,
          sticky: sticky,
          value: value,
          template: template,
          placeholder: placeholder
        }
      end
    end
  end
end
