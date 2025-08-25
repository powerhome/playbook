# frozen_string_literal: true

module Playbook
  module PbCard
    class CardHeader < Playbook::KitBase
      prop :header_color, type: Playbook::Props::String,
                          default: "category_1"
      prop :header_color_striped, type: Playbook::Props::Boolean,
                                  default: false

      def classname
        generate_classname("pb_card_header_kit", header_color_classname, color_striped_classname, separator: " ")
      end

    private

      def color_striped_classname
        header_color_striped ? "pb_card_header_kit_#{header_color}_striped" : nil
      end

      def header_color_classname
        header_color ? "pb_card_header_kit_#{header_color}" : nil
      end
    end
  end
end
