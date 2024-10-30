# frozen_string_literal: true

module Playbook
  module PbDraggable
    class Draggable < ::Playbook::KitBase
      prop :initial_items, type: Playbook::Props::Array,
                           default: []

      def data
        Hash(prop(:data)).merge(pb_draggable: true)
      end

      def classname
        generate_classname("pb_draggable")
      end
    end
  end
end
