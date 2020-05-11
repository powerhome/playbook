# frozen_string_literal: true

module Playbook
    module PbProgressStepper
      class ProgressItemVertical
        include Playbook::Props
  
        partial "pb_progress_stepper/progress_item_vertical"
  
        prop :status, type: Playbook::Props::Enum,
            values: %w[complete active inactive],
            default: "inactive"
  
        def classname
          generate_classname("pb_progress_stepper_item_kit", status)
        end
      end
    end
  end
  