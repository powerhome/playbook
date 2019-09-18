# frozen_string_literal: true

module Playbook
  module PbIconTitle
    class IconTitle < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_icon_variant
                 configured_icon
                 configured_dark
                 configured_size
                 configured_column
               configured_value
             configured_description].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     icon_variant: default_configuration,
                     icon: default_configuration,
                     dark: default_configuration,
                     size: default_configuration,
                     column: default_configuration,
                   value: default_configuration,
                 description: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_icon_variant = icon_variant
        self.configured_icon = icon
        self.configured_dark = dark
        self.configured_size = size
        self.configured_column = column
        self.configured_value = value
        self.configured_description = description
      end

      def dark
        true_value(configured_dark, "dark", nil)
      end

      def column
        true_value(configured_column, "column", nil)
      end

      def size
        size_options = %w[md lg]
        one_of_value(configured_size, size_options, "md")
      end

      def to_partial_path
        "pb_icon_title/icon_title"
      end

      def icon_variant
        variant_options = %w[default royal blue purple teal red yellow green]
        one_of_value(configured_icon_variant, variant_options, "default")
      end

      def icon
        default_value(configured_icon, "user")
      end

      def value
        default_value(configured_value, "Value")
      end

      def description
        default_value(configured_decription, "description")
      end

      def column_sizing
        if column === "column"
          if size === "lg"
            size
          else
            "sm"
          end
        else
          size
        end
      end

      def kit_class
        kit_options = [
          "pb_icon_title_kit",
          icon_variant,
          dark,
          column,
        ]
        kit_options.reject(&:nil?).join("_")
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
