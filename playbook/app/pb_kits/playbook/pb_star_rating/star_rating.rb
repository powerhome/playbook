# frozen_string_literal: true

module Playbook
  module PbStarRating
    class StarRating < Playbook::KitBase
      prop :rating, type: Playbook::Props::Numeric,
                    default: 0

      prop :denominator, type: Playbook::Props::Numeric,
                         default: 5

      prop :layout_option, type: Playbook::Props::Enum,
                           values: %w[default onestar number],
                           default: "default"

      prop :color_option, type: Playbook::Props::Enum,
                          values: %w[yellow primary subtle],
                          default: "yellow"

      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg],
                  default: "sm"

      prop :background_type, type: Playbook::Props::Enum,
                             values: %w[fill outline],
                             default: "fill"

      def one_decimal_rating
        rating.to_f.round(1)
      end

      def star_count
        rating.round > denominator_style ? denominator_style : rating.round
      end

      def denominator_style
        layout_option == "onestar" ? 1 : denominator
      end

      def empty_stars
        (denominator_style - star_count).negative? ? 0 : denominator_style - star_count
      end

      def star_color
        case color_option
        when "yellow"
          "yellow_star"
        when "primary"
          "primary_star"
        when "subtle"
          dark ? "suble_star_dark" : "suble_star_light"
        end
      end

      def background_star_color
        if background_type === "outline"
          dark ? "outline_empty_star_dark" : "outline_empty_star_light"
        else
          dark ? "empty_star_dark" : "empty_star_light"
        end
      end

      def svg_size
        sizes = { "xs": "pb_star_xs",
                  "sm": "pb_star_sm",
                  "md": "pb_star_md",
                  "lg": "pb_star_lg" }
        sizes[size.to_sym]
      end

      def svg_class
        "pb_star_#{size}"
      end

      def background_star_path
        if background_type === "outline"
          "app/pb_kits/playbook/pb_star_rating/stars/star_outline.svg"
        else
          "app/pb_kits/playbook/pb_star_rating/stars/yellow_star.svg"
        end
      end

      def star_svg_path
        case color_option
        when "yellow"
          "app/pb_kits/playbook/pb_star_rating/stars/yellow_star.svg"
        when "primary"
          "app/pb_kits/playbook/pb_star_rating/stars/primary_star.svg"
        when "subtle"
          if dark == true
            "app/pb_kits/playbook/pb_star_rating/stars/subtle_dark_star.svg"
          else
            "app/pb_kits/playbook/pb_star_rating/stars/subtle_star.svg"
          end
        else
          "app/pb_kits/playbook/pb_star_rating/stars/primary_star.svg"
        end
      end

      def classname
        generate_classname("pb_star_rating_kit")
      end
    end
  end
end
