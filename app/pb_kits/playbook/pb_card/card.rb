# frozen_string_literal: true

module Playbook
  module PbCard
    class Card < Playbook::PbKit::Base
      PROPS = %i[configured_aria
                 configured_classname
                 configured_data
                 configured_id
                 configured_padding
                 configured_selected
                 configured_shadow
                 block].freeze

      def initialize(aria: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     padding: default_configuration,
                     selected: default_configuration,
                     shadow: default_configuration,
                     &block)
        self.configured_aria = aria
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_padding = padding
        self.configured_selected = selected
        self.configured_shadow = shadow
        self.block = block_given? ? block : nil
      end

      def selected_class
        true_value(configured_selected, "selected", "deselected")
      end

      def shadow
        shadow_options = %w[none shallow default deep deeper deepest]
        one_of_value(configured_shadow, shadow_options, "none")
      end

      def shadow_class
        adjusted_value(shadow, "shadow_#{shadow}", nil)
      end

      def yield(context:)
        if !block.nil?
          pb_card_body = Playbook::PbCard::CardBody.new(padding: configured_padding) do
            context.capture(&block)
          end
          ApplicationController.renderer.render(partial: pb_card_body, as: :object)
        end
      end

      def kit_class
        card_options = [
          "pb_card_kit",
          selected_class,
          shadow_class,
        ]
        card_options.reject(&:nil?).join("_")
      end

      def to_partial_path
        "pb_card/card"
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
