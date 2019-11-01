# frozen_string_literal: true

module Playbook
  module PbLayout
    class Layout
      include Playbook::Props

      partial "pb_layout/layout"

      prop :collapse, default: "xs"
      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :full, type: Playbook::Props::Boolean, default: false
      prop :position, default: "left"
      prop :transparent, type: Playbook::Props::Boolean, default: false
      prop :size, default: "md"

      def dark_class
        dark ? "dark" : nil
      end

      def full_class
        full ? " full" : ""
      end

      def transparent_class
        transparent ? "transparent" : nil
      end

      def collapse_class
        collapse == "xs" ? " layout_#{position}_collapse_xs" : " layout_#{position}_collapse_#{collapse}"
      end

      def classname
        first_class = generate_classname("pb_layout", size, position, dark_class, transparent_class)
        classname = first_class + full_class + collapse_class
      end

      def yield(context:)
        context.capture(&children)
      end
    end
  end
end
