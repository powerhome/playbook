# frozen_string_literal: true

module Playbook
    module PbProgressStepper
      class ProgressItem
        include Playbook::Props
  
        partial "pb_progress_stepper/progress_item"
  
        prop :status, type: Playbook::Props::Enum,
            values: %w[complete active inactive],
            default: "inactive"
  
        def classname
          generate_classname("pb_progress_step_item_kit", status)
        end
      end
    end
  end
  