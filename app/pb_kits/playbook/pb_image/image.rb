module Playbook
  module PbImage
    class Image
      def initialize(
                   url: default_configuration,
                   size: default_configuration)
        self.configured_url = url
        self.configured_size = size
      end

      def url
        if configured_url == default_configuration
          "Hello World"
        else
          configured_url
        end
      end

      def size
        if configured_size == default_configuration
          "1"
        else
          "_#{configured_size}"
        end
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
      attr_accessor :configured_url, :configured_size

    end
  end
end
