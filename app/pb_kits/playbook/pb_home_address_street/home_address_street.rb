# frozen_string_literal: true

module Playbook
  module PbHomeAddressStreet
    class HomeAddressStreet < Playbook::PbKit::Base
      PROPS = %i[configured_address
                 configured_city
                 configured_classname
                 configured_dark
                 configured_data
                 configured_home_id
                 configured_house_style
                 configured_id
                 configured_state
                 configured_zipcode].freeze

      def initialize(address: default_configuration,
                     city: default_configuration,
                     classname: default_configuration,
                     dark: default_configuration,
                     data: default_configuration,
                     home_id: default_configuration,
                     house_style: default_configuration,
                     id: default_configuration,
                     state: default_configuration,
                     zipcode: default_configuration)
        self.configured_address = address
        self.configured_city = city
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_home_id = home_id
        self.configured_house_style = house_style
        self.configured_state = state
        self.configured_zipcode = zipcode
      end

      def address
        default_value(configured_address, "")
      end

      def city
        default_value(configured_city, "")
      end

      def dark
        true_value(configured_dark, true, false)
      end

      def home_id
        default_value(configured_home_id, "")
      end

      def house_style
        default_value(configured_house_style, "")
      end

      def state
        default_value(configured_state, "")
      end

      def zipcode
        default_value(configured_zipcode, "")
      end

      def to_partial_path
        "pb_home_address_street/home_address_street"
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
