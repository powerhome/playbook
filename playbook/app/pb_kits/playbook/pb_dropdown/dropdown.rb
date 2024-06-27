# frozen_string_literal: true

module Playbook
  module PbDropdown
    class Dropdown < Playbook::KitBase
      prop :options, type: Playbook::Props::Array,
                     default: []
      prop :label, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String
      prop :error, type: Playbook::Props::String

      def data
        Hash(prop(:data)).merge(pb_dropdown: true)
      end

      def classname
        generate_classname("pb_dropdown")
      end

    private

      def error_class
        error.present? ? " error" : ""
      end
    end
  end
end
