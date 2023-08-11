# frozen_string_literal: true

module Playbook
  module PbTable
    class TableCol < Playbook::KitBase
      prop :span, type: Playbook::Props::Number,
                  default: 1
      prop :background_color, type: Playbook::Props::Enum,
                              values: %w[
                                gradient
                                dark
                                light
                                white
                                success
                                warning
                                error
                                info
                                neutral
                                primary
                                shadow
                                category_1
                                category_2
                                category_3
                                category_4
                                category_5
                                category_6
                                category_7
                                category_8
                                category_9
                                category_10
                                category_11
                                category_12
                                category_13
                                category_14
                                category_15
                                category_16
                                category_17
                                category_18
                                category_19
                                category_20
                                category_21
                                success_secondary
                                error_secondary
                                info_secondary
                                warning_secondary
                                neutral_secondary
                                primary_secondary
                                text_lt_default
                                text_lt_light
                                text_lt_lighter
                                text_dk_default
                                text_dk_light
                                text_dk_lighter
                                card_light
                                card_dark
                                data_1
                                data_2
                                data_3
                                data_4
                                data_5
                                data_6
                                data_7
                                data_8
                                border_light
                                border_dark
                                success_subtle
                                warning_subtle
                                error_subtle
                                info_subtle
                                neutral_subtle
                              ],
                              default: "light"

      def classname
        generate_classname("pb_table_col_kit", custom_background_color)
      end

      def custom_background_color
        "background_color_#{background_color}"
      end
    end
  end
end
