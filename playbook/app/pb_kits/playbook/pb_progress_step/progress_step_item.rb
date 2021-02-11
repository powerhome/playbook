# frozen_string_literal: true

module Playbook
  module PbProgressStep
    class ProgressStepItem < Playbook::KitBase
      prop :status, type: Playbook::Props::Enum,
                    values: %w[complete active inactive hidden],
                    default: "inactive"

      prop :icon, required: false, default: "check"

      def name_icon
        icon ? icon : "check"
      end

      def classname
        generate_classname("pb_progress_step_item", status)
      end
    end
  end
end
