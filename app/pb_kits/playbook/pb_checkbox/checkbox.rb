# frozen_string_literal: true

module Playbook
  module PbCheckbox
    class Checkbox < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_dark
                 configured_text
                configured_value
              configured_name
              configured_checked
              configured_icon
            ].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     dark: default_configuration,
                     text: default_configuration,
                   value: default_configuration,
                 name: default_configuration,
                 checked: default_configuration,
                 icon: default_configuration
               )
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_dark = dark
        self.configured_text = text
        self.configured_value = value
        self.configured_name = name
        self.configured_checked = checked
        self.configured_icon = icon

      end

      def to_partial_path
        "pb_checkbox/checkbox"
      end

      def icon
        if is_set? configured_icon
          pb_icon = Playbook::PbIcon::Icon.new(icon: "check", id: "check_icon", classname: "check_icon", fixed_width: true)
          ApplicationController.renderer.render(partial: pb_icon, as: :object)
        end
      end

      def text
        default_value(configured_text, "")
      end

      def value
        default_value(configured_value, "")
      end

      def name
        default_value(configured_name, "")
      end

      def checked
        true_value(configured_checked, "checked='true'",nil)
      end

      def checked_class
        checked ? "on" : "off"
      end


      def dark_class
        true_value(configured_dark, "dark", nil)
      end

      def kit_class
        caption_options = [
          "pb_checkbox_kit",
          dark_class,
          checked_class
        ]
        caption_options.reject(&:nil?).join("_")
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
