# frozen_string_literal: true

module Playbook
  module PbIconValue
    class IconValue < Playbook::PbKit::Base
      PROPS = %i[configured_align
                 configured_classname
                 configured_data
                 configured_icon
                 configured_id
                 configured_text].freeze

      def initialize(align: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     icon: default_configuration,
                     id: default_configuration,
                     text: default_configuration)
        self.configured_align = align
        self.configured_classname = classname
        self.configured_data = data
        self.configured_icon = icon
        self.configured_id = id
        self.configured_text = text
      end

      def icon
        if is_set? configured_icon
          icon_props = { icon: configured_icon, fixed_width: true }
          pb_icon = Playbook::PbIcon::Icon.new(icon_props)
          ApplicationController.renderer.render(partial: pb_icon, as: :object)
        else
          ""
        end
      end

      def text
        default_value(configured_text, "")
      end

      def value
        if is_set? configured_text
          pb_icon_value = Playbook::PbBody::Body.new(color: "light") do
            icon +
              text
          end
          ApplicationController.renderer.render(partial: pb_icon_value, as: :object)
        end
      end

      def kit_class
        kit_options = [
          "pb_icon_value",
          align,
        ]
        kit_options.compact.join("_")
      end

      def to_partial_path
        "pb_icon_value/icon_value"
      end

    private

      def align
        align_options = %w[left center right]
        one_of_value(configured_align, align_options, "left")
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
