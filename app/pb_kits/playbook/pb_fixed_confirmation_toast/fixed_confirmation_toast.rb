# frozen_string_literal: true

module Playbook
  module PbFixedConfirmationToast
    class FixedConfirmationToast < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_id
                 configured_status
                 configured_text].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     status: default_configuration,
                     text: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_status = status
        self.configured_text = text
      end

      def text
        if is_set? configured_text
          pb_text = Playbook::PbTitle::Title.new(size: 4, text: configured_text, classname: "pb_fixed_confirmation_toast_text")
          ApplicationController.renderer.render(partial: pb_text, as: :object)
        end
      end

      def kit_class
        kit_options = [
          "pb_fixed_confirmation_toast_kit",
          status,
        ]
        kit_options.join("_")
      end

      def status
        status_options = %w[success error neutral]
        one_of_value(configured_status, status_options, "neutral")
      end

      def icon
        pb_icon = Playbook::PbIcon::Icon.new(icon: icon_value, classname: "pb_icon")
        ApplicationController.renderer.render(partial: pb_icon, as: :object)
      end

      def icon_value
        case status
        when "success"
          "check"
        when "error"
          "exclamation-triangle"
        when "neutral"
          "info-circle"
        end
      end

      def to_partial_path
        "pb_fixed_confirmation_toast/fixed_confirmation_toast"
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
