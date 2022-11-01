# frozen_string_literal: true

module Playbook
  module PbDialog
    class Dialog < Playbook::KitBase
      prop :cancel_button
      prop :closeable, type: Playbook::Props::Boolean, default: true
      prop :confirm_button
      prop :oncancel
      prop :onchange
      prop :onclose
      prop :onconfirm
      prop :id
      prop :full_height, type: Playbook::Props::Boolean, default: false
      prop :loading, type: Playbook::Props::Boolean, default: false
      prop :portal_classname
      prop :placement, type: Playbook::Props::Enum,
                       values: %w[left center right],
                       default: "center"
      prop :should_close_on_overlay_click, type: Playbook::Props::Boolean, default: true
      prop :status, type: Playbook::Props::String,
                    default: ""
      prop :opened, type: Playbook::Props::Boolean, default: false
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg content],
                  default: "md"
      prop :text
      prop :title
      prop :trigger

      def classname
        generate_classname("pb_dialog")
      end

      def dialog_options
        {
          id: id,
          onCancel: oncancel,
          onChange: onchange,
          onClose: onclose,
          onConfirm: onconfirm,
          trigger: trigger,
          className: classname,
          cancelButton: cancel_button,
          closeable: closeable,
          confirmButton: confirm_button,
          opened: opened,
          size: size,
          text: text,
          title: title,
          fullHeight: full_height,
          loading: loading,
          portalClassName: portal_classname,
          placement: placement,
          shouldCloseOnOverlayClick: should_close_on_overlay_click,
          status: status,
        }
      end
    end
  end
end
