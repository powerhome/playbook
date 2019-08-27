# frozen_string_literal: true

module Playbook
  module PbStarRating
    class StarRating < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_hide_rating
                 configured_id
                 configured_rating].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     hide_rating: default_configuration,
                     id: default_configuration,
                     rating: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_hide_rating = hide_rating
        self.configured_id = id
        self.configured_rating = rating
      end

      def hide_rating
        true_value(configured_hide_rating, "hide_rating", nil)
      end

      def rating
        rating_options = []
        (0..5).step(0.5) do |n|
          rating_options.push strip_trailing_zero(n)
        end
        one_of_value(configured_rating.to_s, rating_options, "0")
      end

      def star_count
        [*1..rating.to_f]
      end

      def star_full
        (rating.to_f % 1).zero?
      end

      def kit_class
        kit_options = [
          "pb_star_rating_kit",
          hide_rating,
        ]
        kit_options.compact.join("_")
      end

      def to_partial_path
        "pb_star_rating/star_rating"
      end

    private

      def strip_trailing_zero(n)
        n.to_s.sub(/\.?0+$/, "")
      end

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
