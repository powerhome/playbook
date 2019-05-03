module Playbook
  module PbBody
    class Body < Playbook::PbKit::Base
      PROPS = [:configured_classname,
          :configured_color,
          :configured_dark,
          :configured_data,
          :configured_id,
          :configured_tag,
          :configured_text].freeze

      def initialize(classname: default_configuration,
                   color: default_configuration,
                   dark: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   tag: default_configuration,
                   text: default_configuration)
        self.configured_classname = classname
        self.configured_color = color
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_tag = tag
        self.configured_text = text
      end

      def color
        self.is_set?(configured_color) ? "_#{configured_color}" : ""
      end

      def dark
        self.true_value(configured_dark, "_dark", "")
      end

      def tag
        self.default_value(configured_tag, "p")
      end

      def text
        self.default_value(configured_text, "This is some text")
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
      attr_accessor(*PROPS)
    end
  end
end
