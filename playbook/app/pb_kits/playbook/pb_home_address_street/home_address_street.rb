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

      def emphasis_partial
        File.join(File.dirname(self.class.source_location), "_#{emphasis}_emphasis")
      end

    private

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
