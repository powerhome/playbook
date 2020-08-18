# frozen_string_literal: true

module Playbook
  module PbStatValue
    class IconStatValue
      include Playbook::Props
      include ActionView::Helpers::NumberHelper

      partial "pb_icon_stat_value/stat_value"

      prop :unit
      prop :value, type: Playbook::Props::Number

      def formatted_value
        number_with_delimiter(value, delimiter: ",")
      end

      def classname
        generate_classname("pb_icon_stat_value_kit")
      end
    end
  end
end
