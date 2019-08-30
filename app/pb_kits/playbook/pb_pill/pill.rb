# frozen_string_literal: true

module Playbook
  module PbPill
    class Pill < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_text
                 configured_variant].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     text: default_configuration,
                     variant: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_text = text
        self.configured_variant = variant
      end

      def display_text
        pb_text = Playbook::PbBody::Body.new(tag: "span") do
          text
        end
        ApplicationController.renderer.render(partial: pb_text, as: :object)
      end

      def kit_class
        kit_options = [
          "pb_pill_kit",
          variant,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_pill/pill"
      end

    private

      def variant
        variant_options = %w[success warning error info neutral]
        one_of_value(configured_variant, variant_options, "neutral")
      end

      def text
        default_value(configured_text.downcase, "")
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
