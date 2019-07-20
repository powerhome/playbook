# frozen_string_literal: true

module Playbook
  module PbBody
    class Body < Playbook::PbKit::Base
      PROPS = %i[configured_aria
                 configured_classname
                 configured_color
                 configured_dark
                 configured_data
                 configured_id
                 configured_tag
                 block].freeze

      def initialize(aria: default_configuration,
                     classname: default_configuration,
                     color: default_configuration,
                     dark: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     status: default_configuration,
                     tag: default_configuration,
                     &block)

        self.configured_aria = aria
        self.configured_classname = classname
        self.configured_color = color
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
        self.configured_status = status
        self.configured_tag = tag
        self.block = block_given? ? block : nil
      end

      def color
        color_options = %w[default light lighter dark light_dark lighter_dark]
        one_of_value(configured_color, color_options, "default")
      end

      def color_class
        color != "default" ? color : nil
      end

      def dark
        is_true? configured_dark
      end

      def dark_class
        true_value(configured_dark, "dark", nil)
      end

      def status
        status_options = %w[neutral negative positive]
        one_of_value(configured_status, status_options, "neutral")
      end

      def status_class
        status != "neutral" ? status : nil
      end

      def tag
        default_value(configured_tag, "p")
      end

      def text
        default_value(configured_text, "Body text")
      end

      def yield(context:)
        context.capture(&block)
      end

      def kit_class
        body_options = [
          "pb_body",
          color_class,
          dark_class,
          status_class,
        ]
        body_options.compact.join("_")
      end

      def to_partial_path
        "pb_body/body"
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
