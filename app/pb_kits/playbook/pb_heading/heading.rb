module Playbook
  module PbHeading
    class Heading
      def initialize(tag: default_configuration,
                   text: default_configuration,
                   size: default_configuration,
                   dark: default_configuration)
        self.configured_tag = tag
        self.configured_text = text
        self.configured_size = size
        self.configured_dark = dark
      end

      def tag
        if configured_tag == default_configuration
          "h1"
        else
          configured_tag
        end
      end

      def text
        if configured_text == default_configuration
          "Hello World"
        else
          configured_text
        end
      end

      def size
        if configured_size == default_configuration
          "_1"
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
        "pb_heading/heading"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor :configured_tag,
          :configured_text,
          :configured_size,
          :configured_dark
    end
  end
end
