# frozen_string_literal: true

module Playbook
  module PbStatChange
    class StatChange < Playbook::KitBase
      prop :change, type: Playbook::Props::Enum,
                    values: %w[neutral increase decrease],
                    default: "neutral"
      prop :icon, type: Playbook::Props::String
      prop :value, type: Playbook::Props::Numeric

      def status
        case change
        when "increase"
          "positive"
        when "decrease"
          "negative"
        else
          "neutral"
        end
      end

      def returned_icon
        icon || case change
                when "increase"
                  "arrow-up"
                when "decrease"
                  "arrow-down"
                else
                  false
                end
      end

      def classname
        generate_classname("pb_stat_change_kit", status)
      end
    end
  end
end
