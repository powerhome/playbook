module Playbook
  module PbDashboardValue
    class StatValue < Playbook::PbKit::Base
      PROPS = [:configured_classname,
					:configured_data,
					:configured_id,
          :configured_unit,
          :configured_value].freeze

      def initialize(classname: default_configuration,
							data: default_configuration,
							id: default_configuration,
              unit: default_configuration,
              value: default_configuration)
        self.configured_classname = classname
				self.configured_data = data
				self.configured_id = id
        self.configured_unit = unit
        self.configured_value = value
      end

      def value
        default_value(configured_value, 0)
      end

      def display_value
        pb_title = Playbook::PbTitle::Title.new({size: 1, text: self.value})
        ApplicationController.renderer.render(partial: pb_title, as: :object)
      end

      def unit
        default_value(configured_unit, nil)
      end

      def display_unit
        if !self.unit.nil?
          pb_unit = Playbook::PbTitle::Title.new({size: 3, text: self.unit})
          ApplicationController.renderer.render(partial: pb_unit, as: :object)
        end
      end

      def kit_class
        stat_options = [
          "pb_stat_value"
        ]
        stat_options.reject(&:nil?).join("_")
      end

      def to_partial_path
        "pb_dashboard_value/child_kits/stat_value"
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
