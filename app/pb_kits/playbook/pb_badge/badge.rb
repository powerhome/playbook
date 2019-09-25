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
          configured_rectangle].freeze

      def initialize(class: default_configuration,
							classname: default_configuration,
							data: default_configuration,
              id: default_configuration,
            text: default_configuration,
          variant: default_configuration,
        rectangle: default_configuration)
				self.configured_classname = classname
				self.configured_data = data
        self.configured_id = id
        self.configured_text = text
        self.configured_variant = variant
        self.configured_rectangle = rectangle
      end

      def text
        default_value(configured_text, "")
      end

      def rectangle
        default_value(configured_rectangle, false)
      end

      def rectangle?
        "rectangle" if rectangle == true
      end

      def kit_class
        kit_options = [
          "pb_badge_kit",
          variant,
          rectangle?
        ]
        kit_options.join("_")
      end

      def variant
        variant_options = %w[success warning error info neutral primary]
        one_of_value(configured_variant, variant_options, "neutral")
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
