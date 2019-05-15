module Playbook
  module PbLayout
    class Sidebar < Playbook::PbKit::Base
      PROPS = [:configured_classname,
          :configured_data,
          :configured_id,
          :block].freeze

      def initialize(classname: default_configuration,
                  data: default_configuration,
                  id: default_configuration,
                  &block)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.block = block_given? ? block : nil
      end

      def yield(context:)
        context.capture(&block)
      end

      def to_partial_path
        "pb_layout/sidebar"
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
