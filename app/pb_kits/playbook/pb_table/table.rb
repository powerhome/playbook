module Playbook
  module PbTable
    class Table < Playbook::PbKit::Base
      PROPS = %i[configured_aria
                 configured_classname
                 configured_container
                 configured_dark
                 configured_data
                 configured_disable_hover
                 configured_id
                 configured_single_line
                 configured_size
                 configured_text
                 block].freeze

      def initialize(aria: default_configuration,
                     classname: default_configuration,
                     container: default_configuration,
                     dark: default_configuration,
                     data: default_configuration,
                     disable_hover: default_configuration,
                     id: default_configuration,
                     single_line: default_configuration,
                     size: default_configuration,
                     &block)
        self.configured_aria = aria
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

      def single_line_class
        true_value(configured_single_line, "single-line", nil)
      end

      def size
        size_options = %w[sm md lg]
        one_of_value(configured_size, size_options, default_configuration)
      end

      def size_class
        adjusted_value(configured_size, "table-#{size}", "table-md")
      end

      def dark_class
        true_value(configured_dark, "table-dark", nil)
      end

      def disable_hover_class
        true_value(configured_disable_hover, "no-hover", nil)
      end

      def container_class
        true_value(configured_container, "table-card", nil)
      end

      def kit_class
        table_options = [
          "pb_table",
          size_class,
          single_line_class,
          dark_class,
          disable_hover_class,
          container_class,
        ]
        table_options.reject(&:nil?).join(" ")
      end

      def yield(context:)
        context.capture(&block)
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
