# frozen_string_literal: true

module Playbook
  module PbMessage
    class Message < Playbook::KitBase
      prop :avatar_name
      prop :avatar_status
      prop :avatar_url
      prop :avatar_grayscale, type: Playbook::Props::Boolean, default: false
      prop :label
      prop :message
      prop :timestamp
      prop :timestamp_object
      prop :timezone, default: "America/New_York"
      prop :align_timestamp, type: Playbook::Props::Enum, values: %w[left right], default: "right"

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
