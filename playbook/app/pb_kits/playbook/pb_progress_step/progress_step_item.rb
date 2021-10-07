# frozen_string_literal: true

module Playbook
  module PbProgressStep
    class ProgressStepItem < Playbook::KitBase
      prop :status, type: Playbook::Props::Enum,
                    values: %w[complete active inactive hidden],
                    default: "inactive"

      prop :icon, required: false, default: "check"
      prop :tooltip, required: false
      prop :tooltip_position, required: false
      prop :step_direction, type: Playbook::Props::Enum,
                            values: %w[horizontal vertical],
                            default: "horizontal"

      def name_icon
        icon || "check"
      end

      def classname
        generate_classname("pb_progress_step_item", status)
      end

      def tooltip_trigger_class
        classname.split(" ").last
      end

      def step_tooltip_position
        if tooltip_position.present?
          if step_direction == "vertical"
            "right"
          else
            "top"
          end
        else
          tooltip_position
        end
      end
    end
  end
end
