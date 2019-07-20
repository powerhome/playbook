module Playbook
  module PbInput
    class Input < Playbook::PbKit::Base
      PROPS = %i[configured_aria
                 configured_classname
                 configured_data
                 configured_id
                 configured_name
                 configured_label
                 configured_placeholder
                 configured_type
                 configured_value].freeze

      def initialize(aria: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     name: default_configuration,
                     label: default_configuration,
                     placeholder: default_configuration,
                     type: default_configuration,
                     value: default_configuration)
        self.configured_aria = aria
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
        if configured_label == default_configuration
          ""
        else
          configured_label
        end
      end

      def name
        if configured_name == default_configuration
          ""
        else
          configured_name
        end
      end

      def placeholder
        if configured_placeholder == default_configuration
          ""
        else
          configured_placeholder
        end
      end

      def type
        if configured_type == default_configuration
          "text"
        else
          configured_type
        end
      end

      def value
        if configured_value == default_configuration
          ""
        else
          configured_value
        end
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
