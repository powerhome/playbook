# frozen_string_literal: true

module Playbook
  module PbFilter
    class Filter
      include Playbook::Props

      partial "pb_filter/filter"

      prop :filters, type: Playbook::Props::HashArray, default: [{ name: "" }]
      prop :sort_menu, type: Playbook::Props::HashArray, default: [{}]
      prop :results, type: Playbook::Props::Numeric
      prop :template, type: Playbook::Props::Enum,
                      values: %w[default single filter_only sort_only],
                      default: "default"
      prop :background, type: Playbook::Props::Boolean, default: true

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
    end
  end
end
