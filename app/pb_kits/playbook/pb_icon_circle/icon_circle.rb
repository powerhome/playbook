# frozen_string_literal: true

module Playbook
  module PbIconCircle
    class IconCircle < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_icon
                 configured_id
                 configured_size
                 configured_variant].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     icon: default_configuration,
                     id: default_configuration,
                     size: default_configuration,
                     variant: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_icon = icon
        self.configured_id = id
        self.configured_size = size
        self.configured_variant = variant
      end

      def icon
        if is_set? configured_icon
          pb_icon = Playbook::PbIcon::Icon.new(icon: configured_icon, fixed_width: true)
          ApplicationController.renderer.render(partial: pb_icon, as: :object)
        end
      end

      def kit_class
        kit_options = [
          "pb_icon_circle",
          size,
          variant,
        ]
        kit_options.join("_")
      end

      def to_partial_path
        "pb_icon_circle/icon_circle"
      end

    private

      def size
        size_options = %w[sm md lg]
        one_of_value(configured_size, size_options, "md")
      end

      def variant
        variant_options = %w[default royal blue purple teal red yellow green]
        one_of_value(configured_variant, variant_options, "default")
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
