# frozen_string_literal: true

module Playbook
  module PbCard
    class CardBody < Playbook::PbKit::Base
      PROPS = %i[configured_aria
                 configured_classname
                 configured_data
                 configured_id
                 configured_padding
                 block].freeze

      def initialize(aria: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     padding: default_configuration,
                     &block)
        self.configured_aria = aria
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_padding = padding
        self.block = block_given? ? block : nil
      end

      def padding_class
        padding_options = %w[none xs sm md lg xl]
        one_of_value(configured_padding.to_s, padding_options, "md")
      end

      def yield(context:)
        context.capture(&block)
      end

      def kit_class
        card_body_options = [
          "pb_card_body",
          padding_class,
        ]
        card_body_options.join("_")
      end

      def to_partial_path
        "pb_card/child_kits/card_body"
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
