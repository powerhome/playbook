# frozen_string_literal: true

module Playbook
  module PbDialog
    class DialogFooter < Playbook::KitBase
      prop :cancel_button
      prop :confirm_button
      prop :confirm_button_id
      prop :cancel_button_id

      def classname
        generate_classname("dialog_footer")
      end
    end
  end
end
