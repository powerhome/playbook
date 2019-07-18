module Playbook
  module PbDashboardValue
    class StatLabel < Playbook::PbKit::Base
      PROPS = [:configured_classname,
					:configured_data,
					:configured_id,
          :configured_label].freeze

      def initialize(classname: default_configuration,
							data: default_configuration,
							id: default_configuration,
              label: default_configuration)
        self.configured_classname = classname
				self.configured_data = data
				self.configured_id = id
        self.configured_label = label
      end

      def label
        default_value(configured_label, nil)
      end

      def display_label
        if !self.label.nil?
          pb_label = Playbook::PbBody::Body.new(color: "light") do
            self.label
          end
          ApplicationController.renderer.render(partial: pb_label, as: :object)
        end
      end

      def kit_class
        "pb_stat_label"
      end

      def to_partial_path
        "pb_dashboard_value/child_kits/stat_label"
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
