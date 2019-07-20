# frozen_string_literal: true

module Playbook
  module PbImage
    class Image < Playbook::PbKit::Base
      PROPS = %i[configured_alt
                 configured_aria
                 configured_classname
                 configured_data
                 configured_id
                 configured_url].freeze

      def initialize(alt: default_configuration,
                     aria: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     url: default_configuration)
        self.configured_alt = alt
        self.configured_aria = aria
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_url = url
      end

      def alt
        default_value(configured_alt, "")
      end

      def url
        default_value(configured_url, "")
      end

      def kit_class
        image_options = %w[
          pb_image
          lazyload
          blur_up
        ]
        image_options.reject(&:nil?).join(" ")
      end

      def to_partial_path
        "pb_image/image"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_reader(*PROPS)
      attr_accessor(*PROPS)
    end
  end
end
