# frozen_string_literal: true

module Playbook
  module PbStatValue
    class StatValue
      include Playbook::Props

      partial "pb_stat_value/stat_value"

      prop :unit
      prop :value, type: Playbook::Props::Number

      def classname
        generate_classname("pb_stat_value_kit")
      end
    end
  end
end
