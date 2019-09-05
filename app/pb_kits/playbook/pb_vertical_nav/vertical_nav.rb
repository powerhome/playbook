# frozen_string_literal: true

module Playbook
  module PbVerticalNav
    class VerticalNav < Playbook::PbKit::Base
      include ActionView::Helpers::TagHelper
      include ActionView::Context

      PROPS = %i[configured_aria
                 configured_classname
                 configured_data
                 configured_id
                 configured_link
                 configured_title
                 block].freeze

      def initialize(aria: default_configuration,
                     classname: default_configuration,
                     data: default_configuration,
                     id: default_configuration,
                     link: default_configuration,
                     title: default_configuration,
                     &block)
        self.configured_aria = aria
        self.configured_classname = classname
        self.configured_data = data
        self.configured_id = id
        self.configured_link = link
        self.configured_title = title
        self.block = block_given? ? block : nil
      end

      def title_text
        pb_title = Playbook::PbCaption::Caption.new(text: configured_title)
        ApplicationController.renderer.render(partial: pb_title, as: :object)
      end

      def title
        if is_set? configured_title
          content_tag(:div, class: "vertical_nav_list_title") do
            content_tag(:a, class: "vertical_nav_list_item_link_text", href: link) do
              title_text
            end
          end
        end
      end

      def link
        default_value(configured_link, "#")
      end

      def yield(context:)
        context.capture(&block)
      end

      def to_partial_path
        "pb_vertical_nav/vertical_nav"
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
