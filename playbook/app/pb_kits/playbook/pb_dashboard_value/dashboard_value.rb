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
        { **stat_value, value: sanitize_stat_value }
      end

      def classname
        generate_classname("pb_dashboard_value_kit", align)
      end

      def sanitize_stat_value
        if stat_value[:value].to_f == stat_value[:value].to_i
          stat_value[:value].to_i
        else
          stat_value[:value].to_f
        end
      end
    end
  end
end
