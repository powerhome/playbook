# frozen_string_literal: true

module Playbook
  module PbToggle
    class Toggle < Playbook::PbKit::Base
      PROPS = %i[configured_aria
                 configured_classname
                 configured_checked
                 configured_data
                 configured_id
                 configured_name
                 configured_size
                 configured_value].freeze

      def initialize(aria: default_configuration,
                     classname: default_configuration,
                     checked: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     name: default_configuration,
                     size: default_configuration,
                     value: default_configuration)
        self.configured_aria = aria
        self.configured_classname = classname
        self.configured_checked = checked
        self.configured_data = data
        self.configured_id = id
        self.configured_name = name
        self.configured_size = size
        self.configured_value = value
      end

      def checked
        true_value(configured_checked, "checked='true'", "")
      end

      def name
        "name=\"#{configured_name}\"" if is_set? configured_name
      end

      def size
        size_options = %w[sm md]
        one_of_value(configured_size, size_options, "md")
      end

      def value
        "value=\"#{configured_value}\"" if is_set? configured_value
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
