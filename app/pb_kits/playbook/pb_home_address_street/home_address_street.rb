# frozen_string_literal: true

module Playbook
  module PbHomeAddressStreet
    class HomeAddressStreet
      include Playbook::Props

      partial "pb_home_address_street/home_address_street"

      prop :address
      prop :address_cont
      prop :city
      prop :home_id, type: Playbook::Props::Number
      prop :house_style
      prop :state
      prop :zipcode
      prop :territory
      prop :dark, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_home_address_street_kit", dark_class)
      end

      def city_state_zip
        "#{city}, #{state} #{zipcode}"
      end

      def address_house_style
        "#{address} #{separator} #{house_style}"
      end

      def address_house_style2
        address_cont
      end

      def separator
        house_style ? "\u00b7" : ""
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
