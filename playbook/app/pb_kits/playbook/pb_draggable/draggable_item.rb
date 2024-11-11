# frozen_string_literal: true

module Playbook
  module PbDraggable
    class DraggableItem < ::Playbook::KitBase
      prop :item, type: Playbook::Props::HashProp,
                  default: {}

      def data
        Hash(prop(:data)).merge(pb_draggable_item: true)
      end

      def classname
        generate_classname("pb_draggable_item")
      end
    end
  end
end
