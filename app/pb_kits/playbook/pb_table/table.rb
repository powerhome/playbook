module Playbook
  module PbTable
    class Table
      PROPS = [:configured_class_name,
          :configured_container,
          :configured_dark,
          :configured_disable_hover,
          :configured_single_line,
          :configured_size,
          :configured_text,
          :block].freeze

      def initialize(class_name: default_configuration,
                    container: default_configuration,
                    dark: default_configuration,
                    disable_hover: default_configuration,
                    single_line: default_configuration,
                    size: default_configuration,
                    &block)
        self.configured_class_name = class_name
        self.configured_container = container
        self.configured_dark = dark
        self.configured_disable_hover = disable_hover
        self.configured_single_line = single_line
        self.configured_size = size
        self.block = block_given? ? block : nil
      end


      def class_name
        if configured_class_name == default_configuration
          ""
        else
          configured_class_name
        end
      end

      def single_line
        if configured_single_line == default_configuration
          ""
        else
          configured_single_line === true ? "single-line" : ""
        end
      end

      def size
        size_options = %w(sm md lg)
        size_default = "sm"
        if configured_size == default_configuration
          size_default
        else
          size_options.include?(configured_size) ? configured_size : size_default
        end
      end

      def dark
        if configured_dark == default_configuration
          ""
        else
          configured_dark === true ? "table-dark" : ""
        end
      end

      def disable_hover
        if configured_disable_hover == default_configuration
          ""
        else
          configured_disable_hover === true ? "no-hover" : ""
        end
      end

      def container
        if configured_container == default_configuration
          ""
        else
          configured_container === true ? "table-card" : ""
        end
      end

      def yield(context:)
        context.capture(&block)
      end

      def to_partial_path
        "pb_table/table"
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
