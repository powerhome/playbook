# frozen_string_literal: true

module Playbook
  module PbDialog
    class Dialog < Playbook::KitBase
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg xl status_size content],
                  default: "md"
      prop :full_height, type: Playbook::Props::Boolean, default: false
      prop :placement, type: Playbook::Props::Enum,
                       values: %w[left right center],
                       default: "center"
      prop :should_close_on_overlay_click, type: Playbook::Props::Boolean, default: true
      prop :title
      prop :text
      prop :loading
      prop :confirm_button
      prop :confirm_button_id
      prop :cancel_button
      prop :cancel_button_id
      prop :status, type: Playbook::Props::Enum,
                    values: ["info", "caution", "delete", "error", "success", "default", ""],
                    default: ""
      prop :custom_event_type, type: Playbook::Props::String,
                               default: ""
      prop :closeable, type: Playbook::Props::Boolean, default: true

      def classname
        generate_classname("pb_dialog pb_dialog_rails pb_dialog_#{size}_#{placement}")
      end

      def full_height_style
        if full_height && size === "xl"
          "full_height_center"
        elsif full_height && size != "xl"
          "full_height_#{placement}"
        end
      end

      def overlay_close
        !should_close_on_overlay_click ? "overlay_close" : ""
      end

      def status_alerts
        alerts = {
          "info" => %w[info-circle default],
          "default" => %w[exclamation-circle default],
          "caution" => %w[exclamation-triangle yellow],
          "delete" => %w[trash-alt red],
          "error" => %w[times-circle red],
          "success" => %w[check-circle green],
        }
        alerts[status]
      end
    end
  end
end
