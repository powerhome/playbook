# frozen_string_literal: true

module Playbook
  module PbDialog
    class DialogHeader
      include Playbook::Props

      partial "pb_dialog/child_kits/dialog_header"

      prop :closeable, type: Playbook::Props::Boolean, default: true
      prop :padding
      prop :separator, type: Playbook::Props::Boolean, default: true
      prop :spacing
      prop :text
      prop :title

      def dialog_header_options
        {
          id: id,
          closeable: closeable,
          padding: padding,
          separator: separator,
          spacing: spacing,
          text: text,
          title: title,
        }
      end
    end
  end
end
