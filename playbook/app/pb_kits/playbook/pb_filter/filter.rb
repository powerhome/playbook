# frozen_string_literal: true

module Playbook
  module PbFilter
    class Filter < Playbook::KitBase
      prop :filters, type: Playbook::Props::HashArray, default: [{ name: "" }]
      prop :sort_menu, type: Playbook::Props::HashArray, default: [{}]
      prop :results, type: Playbook::Props::Numeric
      prop :template, type: Playbook::Props::Enum,
                      values: %w[default single filter_only sort_only],
                      default: "default"
      prop :background, type: Playbook::Props::Boolean, default: true
      prop :max_height
      prop :min_width, default: "auto"
      prop :placement, type: Playbook::Props::Enum,
                       values: %w[top bottom left right top-start top-end bottom-start bottom-end right-start right-end left-start left-end],
                       default: "bottom-start"

      def classname
        generate_classname("pb_filter_kit")
      end

      def result_text
        case results
        when 1
          "#{results} Result"
        when nil
          nil
        else
          "#{results} Results"
        end
      end

      def wrapper(&block)
        if background
          pb_rails("card", props: { padding: "none" }, &block)
        else
          capture(&block)
        end
      end

      def sort_icon(direction)
        case direction
        when "asc"
          "sort-amount-up"
        when "desc"
          "sort-amount-down"
        else
          ""
        end
      end

      def popover_props
        if template != "sort_only"
          {
            max_height: max_height,
            min_width: min_width,
            close_on_click: "outside",
            trigger_element_id: "filter#{id}",
            tooltip_id: "filter-form#{id}",
            position: placement,
          }
        elsif template != "filter_only"
          {
            max_height: max_height,
            classname: "pb_filter_sort_menu",
            close_on_click: "outside",
            trigger_element_id: "sort-button#{id}",
            tooltip_id: "sort-filter-btn-tooltip#{id}",
            position: placement,
            padding: "none",
          }
        end
      end
    end
  end
end
