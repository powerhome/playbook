# frozen_string_literal: true

module Playbook
  module PbStarRating
    class StarRating
      include Playbook::Props

      partial "pb_star_rating/star_rating"

      prop :hide_rating, type: Playbook::Props::Boolean,
                         default: false
      prop :rating, type: Playbook::Props::Numeric,
                    values: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
                    default: 0

      def star_count
        [*1..rating.to_f]
      end

      def star_full
        (rating.to_f % 1).zero?
      end

      def classname
        generate_classname("pb_star_rating_kit", hide_rating)
      end
    end
  end
end
