# frozen_string_literal: true

module Playbook
  module PbHomeAddressStreet
    class HomeAddressStreet < Playbook::KitBase
      prop :address
      prop :address_cont
      prop :city
      prop :emphasis, type: Playbook::Props::Enum,
                      values: %w[street city],
                      default: "street"
      prop :home_id, type: Playbook::Props::Number
      prop :home_url
      prop :house_style
      prop :new_window, type: Playbook::Props::Boolean,
                        default: false
      prop :state
      prop :zipcode
      prop :territory
      prop :dark, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_home_address_street_kit", dark_class)
      end

      def city_state_zip
        [city_state, zipcode].join(" ")
      end

      def city_state
        [city&.titleize, state].join(", ")
      end

      def zip
        zipcode.to_s
      end

      def address_house_style
        [address&.titleize, house_style].join(separator)
      end

      def address_house_style2
        address_cont&.titleize
      end

      def separator
        house_style ? " \u00b7 " : ""
      end

      def city_emphasis_props
        {
          address_house_style: address_house_style,
          address_house_style2: address_house_style2,
          city_state: city_state,
          dark: dark,
          home_id: home_id,
          home_url: home_url,
          new_window: new_window,
          territory: territory,
          zip: zip,
        }
      end

      def street_emphasis_props
        {
          address_house_style: address_house_style,
          address_house_style2: address_house_style2,
          city_state_zip: city_state_zip,
          dark: dark,
          home_id: home_id,
          home_url: home_url,
          new_window: new_window,
          territory: territory,
        }
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
