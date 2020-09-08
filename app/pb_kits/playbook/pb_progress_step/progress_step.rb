# frozen_string_literal: true

module Playbook
  module PbProgressStep
    class ProgressStep
      include Playbook::Props

      partial "pb_progress_step/progress_step"

      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"
      prop :icon, type: Playbook::Props::Boolean,
                  default: false
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default tracker],
                     default: "default"
      def classname
        generate_classname("pb_progress_step_kit", orientation, icon_class, variant_class)
      end

    private

      def icon_class
        icon === true ? "icon" : nil
      end

      def variant_class
        case variant
        when "tracker"
          "tracker"
        end
      end
    end
  end
end
