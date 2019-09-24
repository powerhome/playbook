# frozen_string_literal: true

module Playbook
  module PbInventoryLocation
    class InventoryLocation < Playbook::PbKit::Base
      PROPS = %i[configured_bin
                 configured_classname
                 configured_data
                 configured_id
                 configured_link
                 configured_type].freeze

      def initialize(bin: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     link: nil,
                     type: default_configuration)
        self.configured_bin = bin
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_link = link
        self.configured_type = type
      end

      def bin
        default_value(configured_bin, "")
      end

      def type
        options = %w[cart rack zone]
        one_of_value(configured_type, options, "rack")
      end

      def icon
        default_value(configured_icon, "")
      end

      def to_partial_path
        "pb_inventory_location/inventory_location"
      end

      def content
        pb_label_value = Playbook::PbLabelValue::LabelValue.new(label: "Location") do
          icon_body_title = Playbook::PbIconBodyTitle::IconBodyTitle.new(icon: icon_name, body: type, title: bin, link: configured_link)
          ApplicationController.renderer.render(partial: icon_body_title, as: :object)
        end
        ApplicationController.renderer.render(partial: pb_label_value, as: :object)
      end

    private

      def icon_name
        {
          rack: "inventory",
          cart: 'dolly-flatbed',
          zone: 'flag-checkered',
        }[type.to_sym]
      end

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
