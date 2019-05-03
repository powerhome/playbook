module Playbook
  module PbInput
    class Input < Playbook::PbKit::Base
      PROPS = [:configured_classname,
            :configured_data,
            :configured_id,
            :configured_name,
            :configured_label,
            :configured_placeholder,
            :configured_type,
            :configured_value].freeze

      def initialize(classname: default_configuration,
                    data: default_configuration,
                    id: default_configuration,
                    name: default_configuration,
                    label: default_configuration,
                    placeholder: default_configuration,
                    type: default_configuration,
                    value: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_name = name
        self.configured_label = label
        self.configured_placeholder = placeholder
        self.configured_type = type
        self.configured_value = value
      end

      def label
        self.default_value(configured_label, "")
      end

      def name
        self.default_value(configured_name, "")
      end

      def placeholder
        self.default_value(configured_placeholder, "")
      end

      def type
        self.default_value(configured_type, "text")
      end

      def value
        self.default_value(configured_value, "")
      end

      def to_partial_path
        "pb_input/input"
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
