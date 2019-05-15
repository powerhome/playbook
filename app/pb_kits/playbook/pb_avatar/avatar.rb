module Playbook
  module PbAvatar
    class Avatar < Playbook::PbKit::Base
      PROPS = [:configured_classname,
            :configured_data,
            :configured_id,
            :configured_name,
            :configured_size,
            :configured_text,
            :configured_url].freeze

      def initialize(classname: default_configuration,
                    data: default_configuration,
                    id: default_configuration,
                    name: default_configuration,
                    size: default_configuration,
                    text: default_configuration,
                    url: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_name = name
        self.configured_size = size
        self.configured_text = text
        self.configured_url = url
      end

      def name
        if configured_name == default_configuration
          ""
        else
          configured_name
        end
      end

      def initials
        if configured_name == default_configuration
          ""
        else
          configured_name.split.map(&:first).join.downcase
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
