# frozen_string_literal: true

module Playbook
  module PbNav
    class Nav < Playbook::KitBase
      prop :link, default: "#"
      prop :title
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "vertical"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[normal subtle bold],
                     default: "normal"
      prop :highlight, type: Playbook::Props::Boolean, default: true
      prop :borderless, type: Playbook::Props::Boolean, default: false
      prop :item_padding, type: Playbook::Props::Hash, default: {}

      def classname
        generate_classname("pb_nav_list", variant, orientation, highlight_class, borderless_class)
      end

      def highlight_class
        highlight ? "highlight" : nil
      end

      def borderless_class
        borderless ? "borderless" : nil
      end

      def modified_content
        parsed_content = Nokogiri::HTML.fragment(content.presence)

        parsed_content.css("li").each do |element|
          element["data-orientation"] = orientation
          element["data-variant"] = variant
          element["data-spacing"] = item_padding
        end

        parsed_content.to_html
      end
    end
  end
end
