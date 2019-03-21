module Playbook
  module PbAvatar
    class Avatar < Playbook::PbKit::Base
      PROPS = [:configured_alt,
            :configured_classname,
            :configured_data,
            :configured_id,
            :configured_size,
            :configured_text,
            :configured_url].freeze

      def initialize(alt: default_configuration,
                    classname: default_configuration,
                    data: default_configuration,
                    id: default_configuration,
                    size: default_configuration,
                    text: default_configuration,
                    url: default_configuration)
        self.configured_alt = alt
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
        self.configured_text = text
        self.configured_url = url
      end

      def alt
        if configured_alt == default_configuration
          ""
        else
          configured_alt
        end
      end

      def size
        if configured_size == default_configuration
          "base"
        else
          configured_size
        end
      end

      def text
        if configured_text == default_configuration
          ""
        else
          configured_text
        end
      end

      def url
        if configured_url == default_configuration
          ""
        else
          configured_url
        end
      end

      def to_partial_path
        "pb_avatar/avatar"
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
