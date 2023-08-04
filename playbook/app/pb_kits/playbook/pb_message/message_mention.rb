# frozen_string_literal: true

module Playbook
  module PbMessage
    class MessageMention < Playbook::KitBase
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[user self],
                     default: "user"

      def classname
        generate_classname("pb_message_mention", variant)
      end
    end
  end
end
