module Playbook
  module PbVerticalNav
    class Item < Playbook::PbKit::Base
      PROPS = [:configured_active,
          :configured_classname,
          :configured_data,
          :configured_id,
          :configured_link,
          :configured_text].freeze

      def initialize(active: default_configuration,
                   classname: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   link: default_configuration,
                   text: default_configuration)
        self.configured_active = active
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_link = link
        self.configured_text = text
      end

      def active
        self.true_value(configured_active, "_active", "")
      end

      def link
        self.default_value(configured_link, "#")
      end

      def text
        self.default_value(configured_text, "")
      end

      def to_partial_path
        "pb_vertical_nav/item"
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
