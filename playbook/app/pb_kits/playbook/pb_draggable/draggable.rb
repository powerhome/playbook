# frozen_string_literal: true

module Playbook
  module PbDraggable
    class Draggable < ::Playbook::KitBase
      prop :initial_items, type: Playbook::Props::Array,
                           default: []
      prop :drop_zone_type, type: Playbook::Props::Enum,
                            values: %w[ghost shadow outline line],
                            default: "shadow"
      prop :drop_zone_color, type: Playbook::Props::Enum,
                             values: %w[primary purple],
                             default: "primary"
      prop :drop_zone_orientation, type: Playbook::Props::Enum,
                                   values: %w[horizontal vertical],
                                   default: "vertical"

      def data
        Hash(prop(:data)).merge(pb_draggable: true)
      end

      def classname
        generate_classname("pb_draggable",
                           "drop_zone_#{drop_zone_type}",
                           "drop_zone_#{drop_zone_color}",
                           "drop_zone_#{drop_zone_orientation}")
      end
    end
  end
end
