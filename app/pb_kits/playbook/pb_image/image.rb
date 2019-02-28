module Playbook
  module PbImage
    class Image
      def initialize(
        url: default_configuration)
        self.configured_url = url
      end

      def url
        if configured_url == default_configuration
          "path/to/some/image/placeholder.jpg"
        else
          configured_url
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
      attr_accessor :configured_url

    end
  end
end
