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
                          values: %w[yellow primary subtle outline],
                          default: "yellow"

      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg],
                  default: "sm"

      def star_count
        rating.floor > denominator_style ? denominator_style : rating.floor
      end

      def denominator_style
        layout_option == "onestar" ? 1 : denominator
      end

      def empty_stars
        (denominator_style - rating.floor).negative? ? 0 : denominator_style - rating.floor
      end

      def empty_star_color
        dark ? "empty_star_dark" : "empty_star_light"
      end

      def outline_star_color
        dark ? "outline_star_dark" : "outline_star_light"
      end

      def subtle_star_color
        dark ? "suble_star_dark" : "suble_star_light"
      end

      def svg_size
        case size
        when "sx"
          "pb_star_xs"
        when "sm"
          "pb_star_sm"
        when "md"
          "pb_star_md"
        when "lg"
          "pb_star_lg"
        end
      end

      def classname
        generate_classname("pb_star_rating_kit")
      end
    end
  end
end
