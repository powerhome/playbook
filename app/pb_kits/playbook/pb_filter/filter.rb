# frozen_string_literal: true

module Playbook
  module PbFilter
    class Filter
      include Playbook::Props

      partial "pb_filter/filter"

      prop :filters, type: Playbook::Props::HashArray, default: [{name: ''}]
      prop :sort_menu, type: Playbook::Props::HashArray, default: [{}]
      prop :results, type: Playbook::Props::Numeric
      prop :template, type: Playbook::Props::Enum,
                      values: %w[default single],
                      default: "default"


      def classname
        generate_classname("pb_filter_kit")
      end

      def sort_icon(direction)
        case direction
        when "asc"
          "sort-amount-up"
        when "des"
          "sort-amount-down"
        else
          ""
        end
      end
    end
  end
end
