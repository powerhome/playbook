# frozen_string_literal: true

module Playbook
  module PbDistributionBar
    class DistributionBar < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_size
                 configured_values].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     size: default_configuration,
                     values: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_size = size
        self.configured_values = values
      end

      def size
        size_options = %w[lg sm]
        one_of_value(configured_size, size_options, "lg")
      end

      def values
        default_value(values_to_percents, [1])
      end

      def to_partial_path
        "pb_distribution_bar/distribution_bar"
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)

      def normalize_characters(value)
        return value.to_s.gsub(/(\d\.\d)|[^a-zA-Z\d]/, '\\1').to_i
      end

      def values_to_percents
        normalized_values = configured_values.map(&method(:normalize_characters))
        normalized_values.map { |value| (value.to_f * 100 / normalized_values.sum ).round(2) }
      end
    end
  end
end
