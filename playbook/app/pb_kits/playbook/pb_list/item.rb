# frozen_string_literal: true

module Playbook
  module PbList
    class Item < Playbook::KitBase
      prop :drag_handle, type: Playbook::Props::Boolean,
                         default: true
      prop :drag_id, type: Playbook::Props::String
      prop :tabindex

      def classname
        generate_classname("pb_item_kit")
      end

      def draggable?
        drag_id.present?
      end
    end
  end
end
