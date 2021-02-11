# frozen_string_literal: true

module Playbook
  module PbButtonToolbar
    class ButtonToolbar < Playbook::KitBase
      prop :connected, type: Playbook::Props::Boolean, default: false

      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[horizontal vertical],
                         default: "horizontal"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[primary secondary],
                     default: "primary"
      prop :text

      def classname
        generate_classname("pb_button_toolbar_kit", orientation, variant)
      end

    private

      def connected_class
        connected == true ? "connected" : nil
      end
    end
  end
end
