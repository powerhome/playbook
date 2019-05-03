module Playbook
  module PbButton
    class Button < Playbook::PbKit::Base
      PROPS = [:configured_classname,
          :configured_dark,
          :configured_data,
          :configured_id,
          :configured_size,
          :configured_text,
          :configured_type,
          :configured_wrapperclass].freeze

      def initialize(classname: default_configuration,
                   dark: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   text: default_configuration,
                   type: default_configuration,
                   size: default_configuration,
                   wrapperclass: default_configuration)
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_text = text
        self.configured_type = type
        self.configured_size = size
        self.configured_wrapperclass = wrapperclass
      end

      def wrapperclass
        self.default_value(configured_wrapperclass, "kit_btn_wrapper")
      end

      def text
        self.default_value(configured_text, "Button")
      end

      def type
        self.is_set?(configured_type) ? "_#{configured_type}" : ""
      end

      def size
        self.is_set?(configured_size) ? "_#{configured_size}" : ""
      end

      def dark
        self.true_value(configured_dark, "_dark", "")
      end

      def to_partial_path
        "pb_button/button"
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
