# frozen_string_literal: true

module Playbook
  module PbDraggable
    class DraggableContainer < ::Playbook::KitBase
      prop :tag, type: Playbook::Props::String,
                 default: "div"
      prop :container, type: Playbook::Props::String,
                       default: ""
      prop :drop_zone_direction, type: Playbook::Props::Enum,
                                 values: ["horizontal", "vertical", nil],
                                 default: nil

      def data
        Hash(prop(:data)).merge(pb_draggable_container: true)
      end

      def classname
        direction_class = case drop_zone_direction
                          when "horizontal"
                            "line_horizontal"
                          when "vertical"
                            "line_vertical"
                          end

        generate_classname("pb_draggable_container", direction_class, separator: " ")
      end
    end
  end
end
