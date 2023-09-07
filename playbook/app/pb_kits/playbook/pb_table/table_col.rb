# frozen_string_literal: true

module Playbook
  module PbTable
    class TableCol < Playbook::KitBase
      prop :span, type: Playbook::Props::Number,
                  default: 1
      prop :background_color, type: Playbook::Props::Enum,
                              values: YAML.load_file(Playbook::Engine.root.join("dist/colors.yml"))["background_colors"],
                              default: "card_light"

      def classname
        generate_classname("pb_table_col_kit", custom_background_color)
      end

      def custom_background_color
        "background_color_#{background_color}"
      end
    end
  end
end
