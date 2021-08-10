# frozen_string_literal: true

module Playbook
  module PbProgressStep
    class ProgressStep < Playbook::KitBase
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"
      prop :icon, type: Playbook::Props::Boolean,
                  default: false
      prop :show_icon, type: Playbook::Props::Boolean,
                       default: false
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default tracker],
                     default: "default"
      prop :color, type: Playbook::Props::Enum,
                   values: %w[primary info],
                   default: "primary"
      def classname
        generate_classname("pb_progress_step_kit", orientation, icon_class, variant_class, color_class)
      end

    private

      def icon_class
        icon === true || show_icon === true ? "icon" : nil
      end

      def variant_class
        case variant
        when "tracker"
          "tracker"
        end
      end

      def color_class
        case color
        when "info"
          "info"
        end
      end
    end
  end
end
