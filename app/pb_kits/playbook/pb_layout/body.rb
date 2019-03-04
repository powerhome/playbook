module Playbook
  module PbLayout
    class Body
      PROPS = [:block].freeze

      def initialize(content: default_configuration,
                  &block)
        self.block = block_given? ? block : nil
      end

      def yield(context:)
        context.capture(&block)
      end

      def to_partial_path
        "pb_layout/body"
      end

      def self.options
        new_hash = PROPS.map { |e| e.to_s.remove("configured_") }
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
