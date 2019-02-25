module Playbook
  module PbBody
    class Body
      def initialize(text: default_configuration,
                   tag: default_configuration,
                   color: default_configuration,
                   dark: default_configuration)
        self.configured_tag = tag
        self.configured_color = color
        self.configured_dark = dark
        self.configured_text = text
      end

      def tag
        if configured_tag == default_configuration
          "p"
        else
          configured_tag
        end
      end

      def color
        if configured_color == default_configuration
          "lighter"
        else
          "_#{configured_color}"
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

      def text
        if configured_text == default_configuration
          "This is some text"
        else
          configured_text
        end
      end

      def to_partial_path
        "pb_body/body"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor :configured_text,
          :configured_color,
          :configured_dark,
          :configured_tag
    end
  end
end
