# frozen_string_literal: true

module Playbook
  module PbStatValue
    class StatValue < Playbook::KitBase
      prop :unit
      prop :value, type: Playbook::Props::Numeric

      def formatted_value
        number_with_delimiter(value, delimiter: ",", separator: ".")
      end

      def classname
        generate_classname("pb_stat_value_kit")
      end
    end
  end
end
