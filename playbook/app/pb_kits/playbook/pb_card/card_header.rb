# frozen_string_literal: true

module Playbook
  module PbCard
    class CardHeader < Playbook::KitBase
      prop :header_color, type: Playbook::Props::String,
                          default: "category_1"
      prop :header_color_striped, type: Playbook::Props::Boolean,
                                  default: false

      def classname
        generate_classname("pb_card_header_kit", header_color, color_striped_classname)
      end

    private

      def color_striped_classname
        header_color_striped ? "striped" : nil
      end
    end
  end
end
