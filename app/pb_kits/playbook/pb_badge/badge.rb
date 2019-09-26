# frozen_string_literal: true

module Playbook
  module PbBadge
    class Badge < Playbook::PbKit::Base
      PROPS = %i[
        configured_classname
        configured_data
        configured_id
        configured_text
        configured_variant
        configured_rounded
      ].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     text: default_configuration,
                     variant: default_configuration,
                     rounded: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_text = text
        self.configured_variant = variant
        self.configured_rounded = rounded
      end

      def text
        default_value(configured_text, "")
      end

      def rounded
        true_value(configured_rounded, "rounded", nil)
      end

      def variant
        variant_options = %w[success warning error info neutral primary]
        one_of_value(configured_variant, variant_options, "neutral")
      end

      def kit_class
        kit_options = [
          "pb_badge_kit",
          variant,
          rounded,
        ]
        kit_options.compact.join("_")
      end

      def to_partial_path
        "pb_badge/badge"
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
