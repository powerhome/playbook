# frozen_string_literal: true

module Playbook
  module PbButtonGroup
    class ButtonGroup < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_connect
                 configured_data
                 configured_id
                 configured_orientation
                 block].freeze

      def initialize(classname: default_configuration,
                     connect: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     orientation: default_configuration,
                     &block)
        self.configured_classname = classname
        self.configured_connect = connect
        self.configured_data = data
        self.configured_id = id
        self.configured_orientation = orientation
        self.block = block_given? ? block : nil
      end

      def orientation
        orientation_options = %w[horizontal vertical]
        one_of_value(configured_orientation, orientation_options, "horizontal")
      end

      def connect
        true_value(configured_connect, "connect", nil)
      end

      def kit_class
        kit_options = [
          "pb_button_group",
          connect,
          orientation,
        ]
        kit_options.compact.join("_")
      end

      def yield(context:)
        context.capture(&block)
      end

      def to_partial_path
        "pb_button_group/button_group"
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
