# frozen_string_literal: true

module Playbook
  module PbFixedConfirmationToast
    class FixedConfirmationToast < Playbook::KitBase
      prop :status, type: Playbook::Props::Enum,
                    values: %w[success error neutral tip],
                    default: "neutral"
      prop :text, type: Playbook::Props::String
      prop :multi_line, type: Playbook::Props::Boolean,
                       default: false
      prop :closeable, type: Playbook::Props::Boolean,
                       default: false

      def show_text?
        text.present?
      end

      def close_class
        closeable.present? ? " remove_toast" : ""
      end

      def multi_line_class
        multi_line.present? ? "_multi_line" : ""
      end

      def icon_value
        case status
        when "success"
          "check"
        when "error"
          "exclamation-triangle"
        when "neutral"
          "info-circle"
        when "tip"
          "info-circle"
        end
      end

      def classname
        generate_classname("pb_fixed_confirmation_toast_kit", status) + multi_line_class + close_class
      end
    end
  end
end
