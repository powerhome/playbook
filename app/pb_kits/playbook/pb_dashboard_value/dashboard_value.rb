# frozen_string_literal: true

module Playbook
  module PbDashboardValue
    class DashboardValue
      include Playbook::Props

      partial "pb_dashboard_value/dashboard_value"

      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :stat_change, type: Playbook::Props::Hash,
                         default: {}
      prop :stat_label
      prop :stat_value, type: Playbook::Props::Hash,
                        default: {}

      def classname
        generate_classname("pb_dashboard_value_kit", align)
      end
    end
  end
end
