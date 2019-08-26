# frozen_string_literal: true

module Playbook
  module PbSource
    class Source < Playbook::PbKit::Base
      PROPS = %i[configured_classname
                 configured_data
                 configured_hide_icon
                 configured_id
                 configured_source
                 configured_type
                 configured_user].freeze

      def initialize(classname: default_configuration,
                     data: default_configuration,
                     hide_icon: default_configuration,
                     id: default_configuration,
                     source: default_configuration,
                     type: default_configuration,
                     user: default_configuration)
        self.configured_classname = classname
        self.configured_data = data
        self.configured_hide_icon = hide_icon
        self.configured_id = id
        self.configured_source = source
        self.configured_type = type
        self.configured_user = user
      end

      def source
        pb_source_title = Playbook::PbTitle::Title.new(size: 4, text: configured_source)
        ApplicationController.renderer.render(partial: pb_source_title, as: :object)
      end

      def type_text
        pb_type = Playbook::PbBody::Body.new(color: "light") do
          if type == "user" || (type == "referral" && is_set?(configured_user))
            configured_user[:name]
          else
            type.titleize
          end
        end
        ApplicationController.renderer.render(partial: pb_type, as: :object)
      end

      def type_icon
        if !type_icon_name.nil? && avatar.nil?
          pb_type_icon = Playbook::PbIconCircle::IconCircle.new(icon: type_icon_name, size: "sm")
          ApplicationController.renderer.render(partial: pb_type_icon, as: :object)
        end
      end

      def avatar
        if is_set?(configured_user) && (type == "user" || type == "referral")
          avatar_props = configured_user.clone
          avatar_props[:size] = "sm"
          avatar_props.delete(:user_id)
          pb_avatar = Playbook::PbAvatar::Avatar.new(avatar_props)
          ApplicationController.renderer.render(partial: pb_avatar, as: :object)
        end
      end

      def user_id
        if is_set?(configured_user) && configured_user[:user_id].present?
          pb_user_id = Playbook::PbCaption::Caption.new(text: configured_user[:user_id])
          ApplicationController.renderer.render(partial: pb_user_id, as: :object)
        end
      end

      def hide_icon
        is_true? configured_hide_icon
      end

      def to_partial_path
        "pb_source/source"
      end

    private

      def type_icon_name
        case type
        when "retail"
          "shopping-bag"
        when "inbound"
          "sign-in"
        when "outbound"
          "sign-out"
        when "prospecting"
          "binoculars"
        when "events"
          "calendar-alt"
        when "referral"
          "handshake"
        end
      end

      def type
        type_options = %w[user retail inbound outbound prospecting events referral]
        one_of_value(configured_type, type_options, "inbound")
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
