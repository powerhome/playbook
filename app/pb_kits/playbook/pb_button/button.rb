module Playbook
  module PbButton
    class Button
      def initialize(wrapperclass: default_configuration,
                   text: default_configuration,
                   type: default_configuration,
                   size: default_configuration,
                   dark: default_configuration)
        self.configured_wrapperclass = wrapperclass
        self.configured_text = text
        self.configured_type = type
        self.configured_size = size
        self.configured_dark = dark
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
      attr_accessor :configured_wrapperclass,
          :configured_text,
          :configured_type,
          :configured_size,
          :configured_dark
    end
  end
end
