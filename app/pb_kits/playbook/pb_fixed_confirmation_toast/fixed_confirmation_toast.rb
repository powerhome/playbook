# frozen_string_literal: true

module Playbook
  module PbFixedConfirmationToast
    class FixedConfirmationToast
      include Playbook::Props

      partial "pb_fixed_confirmation_toast/fixed_confirmation_toast"

      prop :status, type: Playbook::Props::Enum,
                    values: %w[success error neutral],
                    default: "neutral"
      prop :text, type: Playbook::Props::String


      def show_text?
        text.present?
      end

      def icon_value
        case status
        when "success"
          "check"
        when "error"
          "exclamation-triangle"
        when "neutral"
          "info-circle"
        end
      end

      def classname
        generate_classname("pb_fixed_confirmation_toast_kit", status)
      end
    end
  end
end
