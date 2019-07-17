module Playbook
  module PbDashboardValue
    class StatChange < Playbook::PbKit::Base
      PROPS = [:configured_change,
          :configured_classname,
					:configured_data,
					:configured_id,
          :configured_value].freeze

      def initialize(change: default_configuration,
              classname: default_configuration,
							data: default_configuration,
							id: default_configuration,
              value: default_configuration)
        self.configured_change = change
        self.configured_classname = classname
				self.configured_data = data
				self.configured_id = id
        self.configured_value = value
      end

      def change
        change_options = %w(neutral increase decrease)
        one_of_value(configured_change, change_options, "neutral")
      end

      def status
        case self.change
        when "increase"
          "positive"
        when "decrease"
          "negative"
        else
          "neutral"
        end
      end

      def icon
        case self.change
        when "increase"
          "arrow-up"
        when "decrease"
          "arrow-down"
        else
          nil
        end
      end

      def display_icon
        if !self.icon.nil?
          pb_icon = Playbook::PbIcon::Icon.new({icon: self.icon, fixed_width: true})
          ApplicationController.renderer.render(partial: pb_icon, as: :object)
        else
          String.new
        end
      end

      def value
        default_value(configured_value, String.new)
      end

      def display_value
        pb_icon_element = Playbook::PbBody::Body.new(status: self.status) do |x|
          self.display_icon +
            self.value
        end
        ApplicationController.renderer.render(partial: pb_icon_element, as: :object)
      end

      def kit_class
        stat_options = [
          "pb_stat_change",
          self.status
        ]
        stat_options.reject(&:nil?).join("_")
      end

      def to_partial_path
        "pb_dashboard_value/child_kits/stat_change"
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
