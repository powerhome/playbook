# frozen_string_literal: true

module Playbook
  module PbListRadios
    class ListRadioItem
      include Playbook::Props

      prop :tabindex

      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :name, type: Playbook::Props::String,
                  default: "radio_name"
      prop :text, type: Playbook::Props::String
      prop :value, type: Playbook::Props::String,
                   default: "radio_text"

      partial "pb_list_radios/list_radio_item"

    end
  end
end
