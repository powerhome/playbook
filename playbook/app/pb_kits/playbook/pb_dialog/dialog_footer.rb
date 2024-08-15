# frozen_string_literal: true

module Playbook
  module PbDialog
    class DialogFooter < Playbook::KitBase
      prop :cancel_button
      prop :cancel_button_id
      prop :confirm_button
      prop :confirm_button_id
      prop :loading

      def classname
        generate_classname("dialog_footer")
      end

      def cancel_loading
        loading ? { disable_cancel_with: "Loading" } : {}
      end

      def loading_data
        loading ? { disable_with: "Loading" } : {}
      end
    end
  end
end
