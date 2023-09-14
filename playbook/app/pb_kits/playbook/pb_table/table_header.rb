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
                       default: "bottom-start"
      prop :sort_menu, type: Playbook::Props::HashArray,
                       default: [{}]
      prop :text, type: Playbook::Props::String,
                  default: ""
      prop :sort_dropdown_menu, type: Playbook::Props::Boolean,
                                default: false

      def classname
        generate_classname("pb_table_header_kit", align_class)
      end

      def align_class
        align.present? ? "align_#{align}" : nil
      end

      def next_link
        return sort_menu[0][:link] if sort_menu.all? { |item| item[:active] == false }

        link = ""

        sort_menu.each_with_index do |item, index|
          if item[:active] == true
            next_index = (index + 1) % sort_menu.length
            link = sort_menu[next_index][:link]
          end
        end
        link
      end

      def non_sorting?
        sort_menu == [{}] || sort_menu == [] || sort_menu.nil?
      end

      def use_dropdown_select
        sort_menu != [{}] && (object.colspan > 1 || sort_dropdown_menu)
      end

      def sort_icon(direction, active)
        case direction
        when "asc"
          active ? "sort-amount-up" : "arrow-up"
        when "desc"
          active ? "sort-amount-down" : "arrow-down"
        else
          ""
        end
      end
    end
  end
end
