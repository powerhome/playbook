# frozen_string_literal: true

module Playbook
  module PbMessage
    class Message
      include Playbook::Props

      partial "pb_message/message"

      prop :avatar_name
      prop :avatar_status
      prop :avatar_url
      prop :label
      prop :message
      prop :timestamp

      def classname
        generate_classname("pb_message_kit", avatar_class)
      end

      def valid?
        avatar_url.present? || avatar_name
      end

    private

      def avatar_class
        valid? ? "avatar" : nil
      end
    end
  end
end
