# frozen_string_literal: true

module Playbook
  module PbList
    class RadioItem < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_name
                 configured_data
                 configured_id
                 block].freeze

      def initialize(classname: default_configuration,
                     name: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     &block)
        self.configured_classname = classname
        self.configured_name = name
        self.configured_data = data
        self.configured_id = id
        self.block = block_given? ? block : nil
      end

      def name
        configured_name
      end

      def to_partial_path
        "pb_list/radio_item"
      end

      def yield(context:)
        context.capture(&block)
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
