module Playbook
  module PbTable
    class Table < Playbook::PbKit::Base
      PROPS = [:configured_classname,
          :configured_container,
          :configured_dark,
          :configured_data,
          :configured_disable_hover,
          :configured_id,
          :configured_single_line,
          :configured_size,
          :configured_text,
          :block].freeze

      def initialize(classname: default_configuration,
                    container: default_configuration,
                    dark: default_configuration,
                    data: default_configuration,
                    disable_hover: default_configuration,
                    id: default_configuration,
                    single_line: default_configuration,
                    size: default_configuration,
                    &block)
        self.configured_classname = classname
        self.configured_container = container
        self.configured_dark = dark
        self.configured_data = data
        self.configured_disable_hover = disable_hover
        self.configured_id = id
        self.configured_single_line = single_line
        self.configured_size = size
        self.block = block_given? ? block : nil
      end

      def single_line
        self.true_value(configured_single_line, "single-line", "")
      end

      def size
        self.one_of_value(configured_size, %w(sm md lg), "sm")
      end

      def dark
        self.true_value(configured_dark, "table-dark", "")
      end

      def disable_hover
        self.true_value(configured_disable_hover, "no-hover", "")
      end

      def container
        self.true_value(configured_container, "table-card", "")
      end

      def yield(context:)
        default_block = ""
        block.present? ? context.capture(&block) : default_block
      end

      def to_partial_path
        "pb_table/table"
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
