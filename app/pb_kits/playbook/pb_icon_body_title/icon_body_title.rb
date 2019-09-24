# frozen_string_literal: true

module Playbook
  module PbIconBodyTitle
    class IconBodyTitle < Playbook::PbKit::Base
      include ActionView::Helpers::TagHelper
      include ActionView::Context

      PROPS = %i[configured_body
                 configured_classname
                 configured_data
                 configured_icon
                 configured_id
                 configured_title
                 configured_link].freeze

      def initialize(body: "",
                     classname: default_configuration,
                     data: default_configuration,
                     icon: default_configuration,
                     id: default_configuration,
                     title: default_configuration,
                     link: nil)
        self.configured_body = body
        self.configured_classname = classname
        self.configured_data = data
        self.configured_icon = icon
        self.configured_id = id
        self.configured_title = title
        self.configured_link = link
      end

      def body
        pb_body = Playbook::PbBody::Body.new(color: "light", classname: "pb_icon_body_title_kit_body") do
          icon + configured_body
        end
        ApplicationController.renderer.render(partial: pb_body, as: :object)
      end

      def icon
        if is_set? configured_icon
          icon_props = { icon: configured_icon, fixed_width: true, classname: "pb_icon_body_title_kit_icon" }
          pb_icon = Playbook::PbIcon::Icon.new(icon_props)
          ApplicationController.renderer.render(partial: pb_icon, as: :object)
        else
          ""
        end
      end

      def title
        if is_set? configured_title
          title_text = if configured_link
            content_tag(:a, href: configured_link) { configured_title } 
          else
            configured_title
          end
          pb_title = Playbook::PbTitle::Title.new(size: 4, tag: "h4", text: title_text, classname: "pb_icon_body_title_kit_title")
          ApplicationController.renderer.render(partial: pb_title, as: :object)
        end
      end

      def to_partial_path
        "pb_icon_body_title/icon_body_title"
      end

      def kit_class
        kit_options = [
          "pb_icon_body_title_kit",
          configured_icon,
        ]
        kit_options.join("_")
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
