module Playbook
  module PbCaption
    class Caption
      def initialize(tag: default_configuration,
                   text: default_configuration,
                   large: default_configuration,
                   dark: default_configuration)
        self.configured_tag = tag
        self.configured_text = text
        self.configured_large = large
        self.configured_dark = dark
      end

      def tag
        if configured_tag == default_configuration
          "div"
        else
          configured_tag
        end
      end

      def text
        if configured_text == default_configuration
          "Caption"
        else
          configured_text
        end
      end

      def large
        if configured_large == default_configuration
          ""
        else
          if (configured_large == true)
            "_lg"
          end
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
        "pb_caption/caption"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor :configured_tag,
          :configured_text,
          :configured_large,
          :configured_dark
    end
  end
end
