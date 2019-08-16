module Playbook
  module PbToggle
    class Toggle < Playbook::PbKit::Base
      PROPS = [:configured_classname,
					:configured_data,
					:configured_id,
          :configured_size,
          :configured_checked
        ].freeze

      def initialize(classname: default_configuration,
							data: default_configuration,
							id: default_configuration,
              size: default_configuration,
              checked: default_configuration)
        self.configured_classname = classname
				self.configured_data = data
				self.configured_id = id
        self.configured_size = size
        self.configured_checked = checked
      end

      def size
        size_options = %w[sm md]
        one_of_value(configured_size, size_options, "md")
      end

      def checked
        true_value(configured_checked, "checked='true'", "")
      end

      def checked_class
        checked ? "on" : "off"
      end

      def kit_class
        toggle_options = [
          "pb_toggle",
          size,
          checked_class
        ]
        toggle_options.join("_")
      end

      def to_partial_path
        "pb_toggle/toggle"
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
