# frozen_string_literal: true

module Playbook
  module PbStarRating
    class StarRating
      include Playbook::Props

      partial "pb_star_rating/star_rating"

      prop :rating, type: Playbook::Props::Numeric,
                    default: 0

      def star_count
        rating.floor
      end

      def star_full
        (rating.to_f % 1).zero?
      end

      def classname
        generate_classname("pb_star_rating_kit")
      end
    end
  end
end
