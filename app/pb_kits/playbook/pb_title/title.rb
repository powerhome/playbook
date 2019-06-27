module Playbook
  module PbTitle
    class Title < Playbook::PbKit::Base
      PROPS = [:configured_aria,
          :configured_classname,
          :configured_dark,
          :configured_data,
          :configured_id,
          :configured_size,
          :configured_tag,
          :configured_text].freeze

      def initialize(aria: default_configuration,
                   classname: default_configuration,
                   dark: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   size: default_configuration,
                   tag: default_configuration,
                   text: default_configuration)
        self.configured_aria = aria
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
        self.configured_tag = tag
        self.configured_text = text
      end

      def tag
        tag_options = %w(h1 h2 h3 h4 h5 h6 p div span)
        one_of_value(configured_tag, tag_options, "h3")
      end

      def text
        default_value(configured_text, "Title text")
      end

      def size
        size_options = [1, 2, 3, 4]
        one_of_value(configured_size, size_options, 3)
      end

      def size_class
        adjusted_value(self.size, self.size, nil)
      end

      def dark_class
        true_value(configured_dark, "dark", nil)
      end

      def kit_class
        title_options = [
          "pb_title",
          size_class,
          dark_class
        ]
        title_options.reject(&:nil?).join("_")
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
