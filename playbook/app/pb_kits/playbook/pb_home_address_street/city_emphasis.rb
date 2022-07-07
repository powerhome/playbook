# frozen_string_literal: true

module Playbook
  module PbHomeAddressStreet
    class CityEmphasis < Playbook::KitBase
      prop :address_house_style
      prop :address_house_style2
      prop :city_state
      prop :home_id, type: Playbook::Props::Number
      prop :home_url
      prop :territory
      prop :zip
      prop :dark, type: Playbook::Props::Boolean, default: false
    end
  end
end
