# frozen_string_literal: true

module Playbook
  module PbDraggable
    class Draggable < ::Playbook::KitBase
      prop :initial_items, type: Playbook::Props::Array,
                           default: []
      prop :drop_zone_type, type: Playbook::Props::Enum,
                            values: %w[ghost shadow outline line],
                            default: "ghost"
      prop :drop_zone_color, type: Playbook::Props::Enum,
                             values: %w[neutral primary purple],
                             default: "neutral"

      def data
        Hash(prop(:data)).merge(pb_draggable: true,
                                drop_zone_type: drop_zone_type,
                                drop_zone_color: drop_zone_color)
      end

      def classname
        generate_classname("pb_draggable")
      end
    end
  end
end
