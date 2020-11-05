# frozen_string_literal: true

module Playbook
  module PbSource
    class Source
      include Playbook::Props

      partial "pb_source/source"

      prop :hide_icon, type: Playbook::Props::Boolean,
                       default: false
      prop :source, type: Playbook::Props::String
      prop :type, type: Playbook::Props::Enum,
                  values: %w[user retail inbound outbound prospecting events referral],
                  default: "inbound"
      prop :user, type: Playbook::Props::Hash, default: {}

      def type_text
        if type == "user" || (type == "referral" && user.present?)
          user[:name]
        else
          type.titleize
        end
      end

      def show_icon?
        !type_icon_name.nil? && avatar.nil?
      end

      def avatar
        if user.present? && (type == "user" || type == "referral")
          avatar_props = user.clone
          avatar_props[:size] = "sm"
          avatar_props.delete(:user_id)
          avatar_props
        end
      end

      def user_id
        user.dig(:user_id)
      end

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

      def classname
        generate_classname("pb_source_kit")
      end
    end
  end
end
