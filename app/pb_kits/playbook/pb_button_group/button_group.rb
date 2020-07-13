# frozen_string_literal: true

module Playbook
  module PbButtonGroup
    class ButtonGroup
      include Playbook::Props

      partial "pb_button_group/button_group"

      prop :connected, type: Playbook::Props::Boolean, default: false

      prop :orientation, type: Playbook::Props::Enum,
            values: %w[horizontal vertical],
            default: "horizontal"

      prop :text 

      def classname
        generate_classname("pb_button_group_kit", orientation, connected_class)
      end

    private
  
      def connected_class
        connected == true ? "connected" : nil
      end
      
    end
  end
end
