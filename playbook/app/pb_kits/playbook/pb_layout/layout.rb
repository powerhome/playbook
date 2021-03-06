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
          generate_classname("pb_layout_kit", layout)
        when "kanban"
          generate_classname("pb_layout_kit", layout, responsive_class)
        when "collection_detail"
          generate_classname("pb_layout_kit", layout)
        when "content"
          generate_classname("pb_layout_kit", layout)
        when "masonry"
          generate_classname("pb_layout_kit", layout)
        else
          first_class = generate_classname("pb_layout_kit_sidebar", "size_#{size}", position, variant, transparent_class)
          [first_class, full_class, collapse_class].reject(&:empty?).join(" ")
        end
      end

    private

      def responsive_class
        responsive ? "responsive" : ""
      end

      def full_class
        full ? "full" : ""
      end

      def transparent_class
        transparent ? "transparent" : nil
      end

      def collapse_class
        "layout_#{position}_collapse_#{collapse}"
      end
    end
  end
end
