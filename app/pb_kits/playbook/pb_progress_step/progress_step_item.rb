# frozen_string_literal: true

module Playbook
  module PbProgressStep
    class ProgressStepItem
      include Playbook::Props

      partial "pb_progress_step/progress_step_item"

      prop :status, type: Playbook::Props::Enum,
                    values: %w[complete active inactive],
                    default: "inactive"

      def classname
        generate_classname("pb_progress_step_item_kit", status)
      end
    end
  end
end
