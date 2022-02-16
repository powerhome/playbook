# frozen_string_literal: true

module Playbook
  module PbBackground
    class Background < Playbook::KitBase
      prop :background_color, type: Playbook::Props::Enum,
                              values: %w[gradient dark light white success warning error info neutral primary category_1 category_2 category_3 category_4 category_5 category_6 category_7 category_8 category_9 category_10 category_11 category_12 category_13 category_14 category_15 category_16 category_17 category_18 category_19 category_20 category_21],
                              default: "light"
      prop :image_url

      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p div span],
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
        custom_color.present? && custom_color.match(/^#[0-9A-F]{6}$/i) ? "background-color: #{custom_color};" : nil
      end

    private

      def image_classname
        if image_url.present?
          "lazyload #{transition}"
        elsif custom_color.present?
          ""
        else
          "pb_background_color_#{background_color}"
        end
      end
    end
  end
end
