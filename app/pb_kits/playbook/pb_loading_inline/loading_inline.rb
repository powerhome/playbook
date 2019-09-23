# frozen_string_literal: true

module Playbook
  module PbLoadingInline
    class LoadingInline < Playbook::PbKit::Base
      PROPS = %i[configured_align
                 configured_classname
                 configured_dark
                 configured_data
                 configured_id].freeze

      def initialize(align: default_configuration,
                     classname: default_configuration,
                     dark: default_configuration,
                     data: default_configuration,
                     id: default_configuration)
        self.configured_align = align
        self.configured_classname = classname
        self.configured_dark = dark
        self.configured_data = data
        self.configured_id = id
      end

      def value
          pb_icon_value = Playbook::PbBody::Body.new(color: "light") do
            icon + "Loading..."
          end
          ApplicationController.renderer.render(partial: pb_icon_value, as: :object)
      end

      def align
        align_options = %w[left center right]
        one_of_value(configured_align, align_options, "left")
      end

      def to_partial_path
        "pb_loading_inline/loading_inline"
      end

      def icon
        pb_icon = Playbook::PbIcon::Icon.new(icon: "spinner",
                                             pulse: true,
                                             fixed_width: true,
                                             classname: "loading-icon")
        ApplicationController.renderer.render(partial: pb_icon, as: :object)
      end

      def dark_class
        true_value(configured_dark, "dark", "dark")
      end

      def kit_class
        loading_inline_options = [
          "pb_loading_inline_kit",
          dark_class,
          align
        ]
        loading_inline_options.join("_")
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
