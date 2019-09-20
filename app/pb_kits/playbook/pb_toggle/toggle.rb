# frozen_string_literal: true

module Playbook
  module PbToggle
    class Toggle < Playbook::PbKit::Base
      include ActionView::Helpers::FormTagHelper
      include ActionView::Context

      PROPS = %i[configured_aria
                 configured_classname
                 configured_checked
                 configured_data
                 configured_id
                 configured_name
                 configured_size
                 configured_value
                 block].freeze

      def initialize(aria: default_configuration,
                     classname: default_configuration,
                     checked: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     name: default_configuration,
                     size: default_configuration,
                     value: default_configuration,
                     &block)
        self.configured_aria = aria
        self.configured_classname = classname
        self.configured_checked = checked
        self.configured_data = data
        self.configured_id = id
        self.configured_name = name
        self.configured_size = size
        self.configured_value = value
        self.block = block_given? ? block : nil
      end

      def checked
        is_true? configured_checked
      end

      def name
        configured_name if is_set? configured_name
      end

      def size
        size_options = %w[sm md]
        one_of_value(configured_size, size_options, "md")
      end

      def value
        configured_value if is_set? configured_value
      end

      def input
        check_box_tag(name, value, checked)
      end

      def yield(context:)
        !block.nil? ? context.capture(&block) : input
      end

      def kit_class
        toggle_options = [
          "pb_toggle_kit",
          size,
          checked_class,
        ]
        toggle_options.join("_")
      end

      def to_partial_path
        "pb_toggle/toggle"
      end

    private

      def checked_class
        checked ? "on" : "off"
      end

      DEFAULT = Object.new
      private_constant :DEFAULT
      def default_configuration
        DEFAULT
      end
      attr_accessor(*PROPS)
    end
  end
end
