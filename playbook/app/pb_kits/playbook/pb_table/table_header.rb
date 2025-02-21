# frozen_string_literal: true

module Playbook
  module PbTable
    class TableHeader < Playbook::KitBase
      prop :align, type: Playbook::Props::Enum,
                   values: %w[start center end stretch baseline none],
                   default: "start"
      prop :align_content, type: Playbook::Props::Enum,
                           values: %w[start center end stretch baseline none],
                           default: "center"
      prop :justify_sort_icon, type: Playbook::Props::Enum,
                               values: %w[start center end stretch around between evenly none],
                               default: "between"
      prop :colspan, type: Playbook::Props::Number,
                     default: 1
      prop :placement, type: Playbook::Props::Enum,
                       values: %w[top bottom left right top-start top-end bottom-start bottom-end right-start right-end left-start left-end],
                       default: "bottom-end"
      prop :sort_menu, type: Playbook::Props::HashArray,
                       default: [{}]
      prop :text, type: Playbook::Props::String,
                  default: ""
      prop :sort_dropdown, type: Playbook::Props::Boolean,
                           default: false
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[table div],
                 default: "table"
      prop :header_style, type: Playbook::Props::Enum,
                          values: %w[default borderless],
                          default: "default"

      def classname
        generate_classname("pb_table_header_kit", align_class, header_style_class) + tag_class
      end

      def tag_class
        " pb_table_th"
      end

      def align_class
        align.present? ? "align_#{align}" : nil
      end

      def next_link(sort_item: "")
        sort_menu_for = if sort_item.blank?
                          sort_menu
                        else
                          sort_items_for(sort_item)
                        end

        return sort_menu_for[0][:link] if sort_menu_for.all? { |item| item[:active] == false }

        link = ""

        sort_menu_for.each_with_index do |item, index|
          if item[:active] == true
            next_index = (index + 1) % sort_menu_for.length
            link = sort_menu_for[next_index][:link]
          end
        end
        link
      end

      def sort_items
        sort_menu.map { |hash| hash[:item] }.uniq
      end

      def sort_items_for(sort_item)
        sort_menu.find_all { |hash| hash[:item] == sort_item }
      end

      def active_or_first_item(items)
        active_item = items.find { |hash| hash[:active] == true }
        if active_item.present?
          active_item
        else
          items[0]
        end
      end

      def sorting_style?
        sort_menu != [{}]
      end

      def use_dropdown_select
        sort_menu != [{}] && (object.colspan > 1 || sort_dropdown)
      end

      def sort_icon(direction, active)
        case direction
        when "asc"
          active ? "sort-amount-up" : ""
        when "desc"
          active ? "sort-amount-down" : ""
        else
          "arrow-up-arrow-down"
        end
      end

      def link_style
        active_item.any? ? "" : "color: #687887;"
      end

      def active_item
        active_item = {}
        sort_menu.each do |item|
          active_item = item if item[:active] == true
        end
        active_item
      end

      def header_style_class
        header_style.present? && header_style != "default" ? "header-borderless" : nil
      end
    end
  end
end
