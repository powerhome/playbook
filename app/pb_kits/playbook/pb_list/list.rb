module Playbook
  module PbList
    class List < Playbook::PbKit::Base
      PROPS = [:configured_borderless,
          :configured_classname,
          :configured_dark,
          :configured_data,
          :configured_id,
          :configured_layout,
          :configured_lg,
          :configured_ordered,
          :configured_xpadding,
          :block].freeze

      def initialize(borderless: default_configuration,
                   classname: default_configuration,
                   dark: default_configuration,
                   data: default_configuration,
                   id: default_configuration,
                   layout: default_configuration,
                   lg: default_configuration,
                   ordered: default_configuration,
                   xpadding: default_configuration,
                   &block)
        self.configured_borderless = borderless
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_layout = layout
        self.configured_lg = lg
        self.configured_ordered = ordered
        self.configured_xpadding = xpadding
        self.block = block_given? ? block : nil
      end

      def dark
        self.true_value(configured_dark, "_dark", "")
      end

      def one_of_value(value, options = [], default = "")
        if self.is_set?(value)
          options.include?(value) ? value : default
        else
          default
        end
      end

      def layout
        self.one_of_value(configured_layout, %w(left right), default = "")
      end

      def layout_class
        layout_default = ""
        processed_layout = self.layout
        if processed_layout != layout_default
          "_layout_#{processed_layout}"
        else
          layout_default
        end
      end

      def lg
        self.true_value(configured_lg, "_lg", "")
      end

      def ordered
        self.false_value(configured_ordered, "ul", "ol")
      end

      def xpadding
        self.true_value(configured_xpadding, "_xpadding", "")
      end

      def borderless
        self.default_value(configured_borderless, "_borderless")
      end

      def yield(context:)
        default_block = ""
        block.present? ? context.capture(&block) : default_block
      end

      def to_partial_path
        "pb_list/list"
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
