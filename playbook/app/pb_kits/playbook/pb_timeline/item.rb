# frozen_string_literal: true

module Playbook
  module PbTimeline
    class Item < Playbook::KitBase
      prop :date
      prop :icon, type: Playbook::Props::String,
                  default: "user"
      prop :icon_color, type: Playbook::Props::Enum,
                        values: %w[default royal blue purple teal red yellow green],
                        default: "default"
      prop :line_style, type: Playbook::Props::Enum,
                        values: %w[solid dotted],
                        default: "solid"

      renders_one :date_area
      renders_one :node_area
      renders_one :detail_area

      def classname
        generate_classname("pb_timeline_item_kit", line_style)
      end
    end
  end
end
