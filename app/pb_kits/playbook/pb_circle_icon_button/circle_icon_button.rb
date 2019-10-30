# frozen_string_literal: true

module Playbook
  module PbCircleIconButton
    class CircleIconButton
      include Playbook::Props

      partial "pb_circle_icon_button/circle_icon_button"

      prop :button, type: Playbook::Props::Hash, default: {}
      prop :icon
      
      def classname
        generate_classname("pb_circle_icon_button_kit")
      end

    private

    end

  end
end
