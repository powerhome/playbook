module Playbook
  module PbTitle
    class Title < Playbook::PbKit::Base
      PROPS = [:configured_classname,
          :configured_dark,
          :configured_data,
          :configured_id,
          :configured_size,
          :configured_tag,
          :configured_text].freeze

      def initialize(classname: default_configuration,
                   dark: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   size: default_configuration,
                   tag: default_configuration,
                   text: default_configuration)
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
        self.configured_tag = tag
        self.configured_text = text
      end

      def tag
        self.default_value(configured_tag, "h1")
      end

      def text
        self.default_value(configured_text, "Hello World")
      end

      def size
        self.one_of_value(configured_size, [1,2,3,4], 1)
      end

      def size_class
        processed_size = self.size
        "_#{processed_size}"
      end

      def dark
        self.true_value(configured_dark, "_dark", "")
      end

      def to_partial_path
        "pb_title/title"
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
