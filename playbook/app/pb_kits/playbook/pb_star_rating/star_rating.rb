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

      def svg_size
        case size
        when "sx"
          14
        when "sm"
          16
        when "md"
          24
        when "lg"
          48
        else
          16
        end
      end

      def classname
        generate_classname("pb_star_rating_kit")
      end
    end
  end
end
