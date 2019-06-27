module Playbook
  module PbCaption
    class Caption < Playbook::PbKit::Base
      PROPS = [:configured_aria,
          :configured_classname,
          :configured_dark,
          :configured_data,
          :configured_id,
          :configured_large,
          :configured_tag,
          :configured_text].freeze

      def initialize(aria: default_configuration,
                   classname: default_configuration,
                   dark: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   large: default_configuration,
                   tag: default_configuration,
                   text: default_configuration)
        self.configured_aria = aria
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_large = large
        self.configured_tag = tag
        self.configured_text = text
      end

      def tag
        tag_options = %w(h1 h2 h3 h4 h5 h6 p span div)
        one_of_value(configured_tag, tag_options, "div")
      end

      def text
        default_value(configured_text, "Caption")
      end

      def large_class
        true_value(configured_large, "lg", nil)
      end

      def dark_class
        true_value(configured_dark, "dark", nil)
      end

      def kit_class
        caption_options = [
          "pb_caption",
          large_class,
          dark_class
        ]
        caption_options.reject(&:nil?).join("_")
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
      attr_accessor(*PROPS)
    end
  end
end
