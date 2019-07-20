module Playbook
  module PbVerticalNav
    class Item < Playbook::PbKit::Base
      PROPS = %i[configured_active
                 configured_classname
                 configured_data
                 configured_id
                 configured_link
                 configured_text
                 block].freeze

      def initialize(active: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     link: default_configuration,
                     text: default_configuration,
                     &block)
        self.configured_active = active
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_link = link
        self.configured_text = text
        self.block = block_given? ? block : nil
      end

      def active
        if configured_active == default_configuration
          ''
        else
          '_active' if configured_active == true
        end
      end

      def text
        if configured_text == default_configuration
          ''
        else
          configured_text
        end
      end

      def link
        if configured_link == default_configuration
          '#'
        else
          configured_link
        end
      end

      def yield(context:)
        !block.nil? ? context.capture(&block) : ''
      end

      def to_partial_path
        'pb_vertical_nav/item'
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
