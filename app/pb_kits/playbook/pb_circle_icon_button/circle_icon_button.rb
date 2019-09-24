# frozen_string_literal: true

module Playbook
  module PbCircleIconButton
    class CircleIconButton < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_icon
                 configured_variant
                 configured_link].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     icon: default_configuration,
                     variant: default_configuration,
                     link: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_icon = icon
        self.configured_variant = variant
        self.configured_link = link
      end

      def icon
        if is_set? configured_icon
          pb_icon = Playbook::PbIcon::Icon.new(icon: configured_icon, fixed_width: true, size: "md")
          ApplicationController.renderer.render(partial: pb_icon, as: :object)
        end
      end

      def kit_class
        kit_options = [
          "pb_circle_icon_button_kit",
          variant,
        ]
        kit_options.join("_")
      end

      def link
        default_value(configured_link, "https://www.google.com")
      end

      def variant
        variant_options = %w[primary secondary]
        one_of_value(configured_variant, variant_options, "primary")
      end

      def to_partial_path
        "pb_circle_icon_button/circle_icon_button"
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
