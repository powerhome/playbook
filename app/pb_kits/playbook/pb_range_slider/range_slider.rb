# frozen_string_literal: true

module Playbook
  module PbRangeSlider
    class RangeSlider < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_max
                 configured_min
                 configured_step
                 configured_value
                 block].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     max: default_configuration,
                     min: default_configuration,
                     step: default_configuration,
                     value: default_configuration,
                     &block)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_max = max
        self.configured_min = min
        self.configured_step = step
        self.configured_value = value
        self.block = block_given? ? block : nil
      end

      def max
        default_value(configured_max, 100)
      end

      def min
        default_value(configured_min, 0)
      end

      def step
        default_value(configured_step, 1)
      end

      def value
        default_value(configured_value, 0)
      end

      def to_partial_path
        "pb_range_slider/range_slider"
      end

      def yield(context:)
        context.capture(&block)
      end

      def block?
        block.present?
      end

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
