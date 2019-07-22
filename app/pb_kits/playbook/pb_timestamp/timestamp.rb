# frozen_string_literal: true

module Playbook
  module PbTimestamp
    class Timestamp < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_text
                 block].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     text: default_configuration,
                     &block)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_text = text
        self.block = block_given? ? block : nil
      end

      def text
        default_value(configured_text, "")
      end

      def yield(context:)
        !block.nil? ? context.capture(&block) : text
      end

      def kit_class
        "pb_timestamp"
      end

      def to_partial_path
        "pb_timestamp/timestamp"
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
