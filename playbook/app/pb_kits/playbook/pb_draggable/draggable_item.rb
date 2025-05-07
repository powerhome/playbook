# frozen_string_literal: true

module Playbook
  module PbDraggable
    class DraggableItem < ::Playbook::KitBase
      prop :drag_id, type: Playbook::Props::String,
                     default: ""
      prop :tag, type: Playbook::Props::String,
                 default: "div"
      prop :container, type: Playbook::Props::String,
                       default: ""
      prop :drop_zone_line_color, type: Playbook::Props::Enum,
                                  values: ["primary", "purple", nil],
                                  default: nil

      def data
        Hash(prop(:data)).merge(pb_draggable_item: true)
      end

      def classname
        line_color_class = case drop_zone_line_color
                           when "primary"
                             "drop_zone_color_primary"
                           when "purple"
                             "drop_zone_color_purple"
                           end

        generate_classname("pb_draggable_item", line_color_class, separator: " ")
      end
    end
  end
end
