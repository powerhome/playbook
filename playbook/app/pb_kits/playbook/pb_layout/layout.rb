# frozen_string_literal: true

module Playbook
  module PbLayout
    class Layout < Playbook::KitBase
      prop :collapse, type: Playbook::Props::Enum,
                      values: %w[xs sm md lg xl],
                      default: "xs"
      prop :full, type: Playbook::Props::Boolean, default: false
      prop :position, type: Playbook::Props::Enum,
                      values: %w[left right],
                      default: "left"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg xl],
                  default: "md"
      prop :transparent, type: Playbook::Props::Boolean, default: false
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[light dark gradient],
                     default: "light"
      prop :layout, type: Playbook::Props::Enum,
                    values: %w[sidebar collection collection_detail kanban content masonry],
                    default: "sidebar"
      prop :responsive, type: Playbook::Props::Boolean, default: false

      def classname
        case layout
        when "collection"
          "pb_layout_kit_collection"
        when "kanban"
          classes = ["pb_layout_kit_kanban"]
          classes << "pb_layout_kit_kanban_responsive" if responsive
          classes.join(" ")
        when "collection_detail"
          "pb_layout_kit_collection_detail"
        when "content"
          "pb_layout_kit_content"
        when "masonry"
          "pb_layout_kit_masonry"
        else
          # Sidebar layout
          classes = [
            "pb_layout_kit_sidebar",
            "pb_layout_kit_sidebar_size_#{size}_#{position}_#{variant}",
          ]
          classes << "pb_layout_kit_sidebar_transparent" if transparent
          classes << "pb_layout_kit_sidebar_full" if full
          classes << "layout_#{position}_collapse_#{collapse}"
          classes.join(" ")
        end
      end
    end
  end
end
