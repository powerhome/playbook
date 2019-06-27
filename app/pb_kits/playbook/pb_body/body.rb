module Playbook
  module PbBody
    class Body < Playbook::PbKit::Base
      PROPS = [:configured_classname,
          :configured_color,
          :configured_dark,
          :configured_data,
          :configured_id,
          :configured_tag,
          :configured_text,
          :block].freeze


      def initialize(classname: default_configuration,
                   color: default_configuration,
                   dark: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   tag: default_configuration,
                   text: default_configuration,
                   &block)
        self.configured_classname = classname
        self.configured_color = color
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_tag = tag
        self.configured_text = text
        self.block = block_given? ? block : nil
      end

      def color
        if configured_color == default_configuration
          ""
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

      def tag
        if configured_tag == default_configuration
          "p"
        else
          configured_tag
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

      def yield(context:)
        context.capture(&block)
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
