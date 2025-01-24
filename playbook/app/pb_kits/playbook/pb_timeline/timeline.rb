# frozen_string_literal: true

module Playbook
  module PbTimeline
    class Timeline < Playbook::KitBase
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"
      prop :show_date, type: Playbook::Props::Boolean,
                       default: false
      prop :item_gap, type: Playbook::Props::Enum,
                      values: %w[xs sm md lg none],
                      default: "none"

      def classname
        generate_classname("pb_timeline_kit",
                           orientation,
                           date_class,
                           item_gap_class)
      end

    private

      def date_class
        show_date ? "with_date" : nil
      end

      def item_gap_class
        item_gap == "none" ? nil : "gap_#{item_gap}"
      end
    end
  end
end
