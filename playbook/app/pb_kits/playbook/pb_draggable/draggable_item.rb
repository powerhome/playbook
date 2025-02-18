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

      def data
        Hash(prop(:data)).merge(pb_draggable_item: true)
      end

      def classname
        generate_classname("pb_draggable_item")
      end
    end
  end
end
