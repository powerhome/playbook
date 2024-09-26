# frozen_string_literal: true

module Playbook
  module PbHomeAddressStreet
    class CityEmphasis < Playbook::KitBase
      prop :address_house_style
      prop :address_house_style2
      prop :city_state
      prop :home_id, type: Playbook::Props::Number
      prop :home_url
      prop :new_window, type: Playbook::Props::Boolean,
                        default: false
      prop :target
      prop :territory
      prop :zip
      prop :dark, type: Playbook::Props::Boolean, default: false

      def target_option
        if target && home_url
          target
        elsif new_window
          "_blank"
        else
          "_self"
        end
      end
    end
  end
end
