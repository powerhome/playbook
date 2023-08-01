# frozen_string_literal: true

# rubocop:disable Layout/HashAlignment

module Playbook
  module PbBackground
    class Background < Playbook::KitBase
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
      prop :background_position, type: Playbook::Props::String,
                                default: nil
      prop :background_repeat, type: Playbook::Props::Enum,
                                values: %w[
                                  repeat
                                  repeat-x
                                  repeat-y
                                  no-repeat
                                  space
                                  round
                                  initial
                                  inherit
                                ],
                                default: "initial"

      prop :background_size, type: Playbook::Props::Enum,
                              values: %w[contain cover auto],
                              default: "cover"

      prop :image_url

      prop :tag, type: Playbook::Props::Enum,
                  values: %w[h1 h2 h3 h4 h5 h6 p div span tr th td],
                  default: "div"

      prop :transition, type: Playbook::Props::Enum,
                        values: ["blur", "fade", "scale", nil],
                        default: nil

      prop :custom_color, type: Playbook::Props::String,
                          default: nil

      def classname
        generate_classname("pb_background_kit", image_classname, separator: " ")
      end

      def custom_background_color
        "background-color: #{custom_color};
        background-position: #{background_position}"
      end

    private

      def image_classname
        background_class = custom_color.present? ? "pb_background_custom_color" : "pb_background_color_#{background_color}"
        background_class_lazy = image_url.present? ? " lazyload #{transition}" : ""
        "#{background_class}#{background_class_lazy}"
      end
    end
  end
end
# rubocop:enable Layout/HashAlignment
