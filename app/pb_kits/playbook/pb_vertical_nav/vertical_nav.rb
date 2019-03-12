module Playbook
  module PbVerticalNav
    class VerticalNav < Playbook::PbKit::Base
      PROPS = [:configured_classname,
          :configured_data,
          :configured_id,
          :configured_link,
          :configured_title,
          :block].freeze

      def initialize(classname: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   link: default_configuration,
                   title: default_configuration,
                   &block)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_link = link
        self.configured_title = title
        self.block = block_given? ? block : nil
      end

      def title
        if configured_title == default_configuration
          ""
        else
          configured_title
        end
      end

      def link
        if configured_link == default_configuration
          "#"
        else
          configured_link
        end
      end

      def yield(context:)
        context.capture(&block)
      end

      def to_partial_path
        "pb_vertical_nav/vertical_nav"
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
