# frozen_string_literal: true

module Playbook
  module PbInventoryLocation
    class InventoryLocation < Playbook::PbKit::Base
      PROPS = %i[configured_bin
                 configured_classname
                 configured_data
                 configured_icon
                 configured_id
                 configured_link
                 configured_type].freeze

      def initialize(bin: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     icon: default_configuration,
                     id: default_configuration,
                     link: default_configuration,
                     type: default_configuration)
        self.configured_bin = bin
        self.configured_classname = classname
        self.configured_data = data
        self.configured_icon = icon
        self.configured_id = id
        self.configured_link = link
        self.configured_type = type
      end

      def bin
        default_value(configured_bin, "")
      end

      def icon
        default_value(configured_icon, "")
      end

      def link
        default_value(configured_link, "")
      end

      def type
        default_value(configured_type, "")
      end

      def to_partial_path
        "pb_inventory_location/inventory_location"
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
