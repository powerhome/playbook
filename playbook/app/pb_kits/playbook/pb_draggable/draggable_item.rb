# frozen_string_literal: true

module Playbook
  module PbDraggable
    class DraggableItem < Playbook::KitBase
      prop :container
      prop :drag_id, type: Playbook::Props::String,
                     default: ""

      def data
        Hash(prop(:data)).merge(
          pb_draggable_item: true,
          pb_draggable_item_container: container.presence || "",
          pb_draggable_item_drag_id: drag_id
        )
      end

      def classname
        generate_classname("pb_draggable_item")
      end
    end
  end
end
