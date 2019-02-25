module Playbook
  module PbCard
    class Card
      def initialize(name: default_configuration,
                     &block)
        self.configured_name = name
        self.block = block_given? ? block : nil
      end

      def name
        if configured_name == default_configuration
          "Tim"
        else
          configured_name
        end
      end

      def yield(context:)
        context.capture(&block)
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
      attr_accessor :configured_name,
          :block
    end
  end
end
