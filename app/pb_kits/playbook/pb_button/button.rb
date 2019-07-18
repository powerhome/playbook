module Playbook
  module PbButton
    class Button < Playbook::PbKit::Base
      PROPS = %i[configured_aria
                 configured_classname
                 configured_data
                 configured_disabled
                 configured_full_width
                 configured_id
                 configured_link
                 configured_loading
                 configured_new_window
                 configured_variant
                 configured_tag
                 configured_text
                 block].freeze

      def initialize(aria: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     disabled: default_configuration,
                     full_width: default_configuration,
                     id: default_configuration,
                     link: default_configuration,
                     loading: default_configuration,
                     new_window: default_configuration,
                     variant: default_configuration,
                     tag: default_configuration,
                     text: default_configuration,
                     &block)
        self.configured_aria = aria
        self.configured_classname = classname
        self.configured_data = data
        self.configured_disabled = disabled
        self.configured_full_width = full_width
        self.configured_id = id
        self.configured_link = link
        self.configured_loading = loading
        self.configured_new_window = new_window
        self.configured_variant = variant
        self.configured_tag = tag
        self.configured_text = text
        self.block = block_given? ? block : nil
      end

      def disabled
        is_true? configured_disabled
      end

      def loading
        is_true? configured_loading
      end

      def loading_class
        loading ? "loading" : nil
      end

      def loading_icon
        pb_icon = Playbook::PbIcon::Icon.new(icon: "spinner",
                                             pulse: true,
                                             spin: true,
                                             fixed_width: true,
                                             classname: "loading-icon")
        ApplicationController.renderer.render(partial: pb_icon, as: :object)
      end

      def disabled_class
        true_value(disabled, "disabled", "enabled")
      end

      def full_width_class
        true_value(configured_full_width, "block", "inline")
      end

      def link
        default_value(configured_link, "")
      end

      def variant
        variant_options = %w[primary secondary link]
        one_of_value(configured_variant, variant_options, "primary")
      end

      def tag
        tag_options = %w[button a]
        if link.empty?
          one_of_value(configured_tag, tag_options, "button")
        else
          "a"
        end
      end

      def new_window
        true_value(configured_new_window, "_blank", "_self")
      end

      def text
        default_value(configured_text, "")
      end

      def yield(context:)
        !block.nil? ? context.capture(&block) : text
      end

      def kit_class
        kit_options = [
          "pb_button",
          variant,
          full_width_class,
          disabled_class,
          loading_class
        ]
        kit_options.compact.join("_")
      end

      def to_partial_path
        "pb_button/button"
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
