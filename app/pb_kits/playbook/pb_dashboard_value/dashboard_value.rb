# frozen_string_literal: true

module Playbook
  module PbDashboardValue
    class DashboardValue < Playbook::PbKit::Base
      PROPS = %i[configured_align
                 configured_classname
                 configured_data
                 configured_id
                 configured_stat_change
                 configured_stat_label
                 configured_stat_value].freeze

      def initialize(align: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     stat_change: default_configuration,
                     stat_label: default_configuration,
                     stat_value: default_configuration)

        self.configured_align = align
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_stat_change = stat_change
        self.configured_stat_label = stat_label
        self.configured_stat_value = stat_value
      end

      def align
        align_options = %w[left center right]
        one_of_value(configured_align, align_options, "left")
      end

      def stat_label
        if is_set? configured_stat_label
          pb_label = Playbook::PbBody::Body.new(color: "light") do
            configured_stat_label[:label]
          end
          ApplicationController.renderer.render(partial: pb_label, as: :object)
        end
      end

      def stat_value
        if is_set? configured_stat_value
          pb_value = Playbook::PbStatValue::StatValue.new(configured_stat_value)
          ApplicationController.renderer.render(partial: pb_value, as: :object)
        end
      end

      def stat_change
        if is_set? configured_stat_change
          pb_change = Playbook::PbStatChange::StatChange.new(configured_stat_change)
          ApplicationController.renderer.render(partial: pb_change, as: :object)
        end
      end

      def kit_class
        kit_options = [
          "pb_dashboard_value_kit",
          align,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_dashboard_value/dashboard_value"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
