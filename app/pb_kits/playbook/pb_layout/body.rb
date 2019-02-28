module Playbook
  module PbLayout
    class Body
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

    private

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor :block
    end
  end
end
