# frozen_string_literal: true

module Playbook
  module PbStarRating
    class StarRating
      include Playbook::Props

      partial "pb_star_rating/star_rating"

      prop :hide_rating, type: Playbook::Props::Boolean,
                         default: false
      prop :rating

      def rating
        rating_options = []
        (0..5).step(0.5) do |number|
          rating_options.push strip_trailing_zero(number)
        end
        one_of_value(rating.to_s, rating_options, "0")
      end

      def star_count
        [*1..rating.to_f]
      end

      def star_full
        (rating.to_f % 1).zero?
      end

      def classname
        generate_classname("pb_star_rating", hide_rating)
      end

    private

      def strip_trailing_zero(number)
        number.to_s.sub(/\.?0+$/, "")
      end
    end
  end
end
