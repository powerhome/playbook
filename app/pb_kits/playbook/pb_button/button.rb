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
        if configured_wrapperclass == default_configuration
          "kit_btn_wrapper"
        else
          configured_wrapperclass
        end
      end

      def text
        if configured_text == default_configuration
          "Button"
        else
          configured_text
        end
      end

      def type
        if configured_type == default_configuration
          ""
        else
          "_#{configured_type}"
        end
      end

      def size
        if configured_size == default_configuration
          ""
        else
          "_#{configured_size}"
        end
      end

      def dark
        if configured_dark == default_configuration
          ""
        else
          if (configured_dark == true)
            "_dark"
          end
        end
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
