# frozen_string_literal: true

module Playbook
  module PbDashboardValue
    class DashboardValue < Playbook::KitBase
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :stat_change, type: Playbook::Props::Hash,
                         default: {}
      prop :stat_label
      prop :stat_value, type: Playbook::Props::Hash,
                        default: {}

      def formatted_stat_value
        { **stat_value, value: sanitized_stat_value }
      end

      def classname
        generate_classname("pb_dashboard_value_kit", align)
      end

      # rubocop:disable Lint/FloatComparison
      # Comparing the value coerced to a float versus an integer is the point of this methodd
      def sanitized_stat_value
        value = stat_value[:value]
        if value.is_a?(::String)
          value.to_f == value.to_i ? value.to_i : value.to_f
        else
          value
        end
      end
      # rubocop:enable Lint/FloatComparison
    end
  end
end
