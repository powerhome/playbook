# frozen_string_literal: true

module Playbook
  module PbDropdown
    class Dropdown < Playbook::KitBase
      prop :options, type: Playbook::Props::Array,
                     default: []

      def classname
        generate_classname("pb_dropdown")
      end
    end
  end
end
