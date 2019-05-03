module Playbook
  module PbCaption
    class Caption < Playbook::PbKit::Base
      PROPS = [:configured_classname,
          :configured_dark,
          :configured_data,
          :configured_id,
          :configured_large,
          :configured_tag,
          :configured_text].freeze

      def initialize(classname: default_configuration,
                   dark: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   large: default_configuration,
                   tag: default_configuration,
                   text: default_configuration)
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_large = large
        self.configured_tag = tag
        self.configured_text = text
      end

      def tag
        self.default_value(configured_tag, "div")
      end

      def text
        self.default_value(configured_text, "Caption")
      end

      def large
        self.true_value(configured_large, "_lg", "")
      end

      def dark
        self.true_value(configured_dark, "_dark", "")
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
