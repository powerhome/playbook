# frozen_string_literal: true

module Playbook
  module PbProgressStepper
    class ProgressStepper
      include Playbook::Props

      partial "pb_progress_stepper/progress_stepper"


      prop :orientation, type: Playbook::Props::Enum,
            values: %w[vertical horizontal],
            default: "horizontal"

      def classname
        generate_classname("pb_progress_stepper_kit", orientation)
      end
    end
  end
end
