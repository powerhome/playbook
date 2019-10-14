# frozen_string_literal: true

module Playbook
  module PbOnlineStatus
    class OnlineStatus
      include Playbook::Props

      partial "pb_online_status/online_status"

      prop :type, type: Playbook::Props::Enum,
                  values: %w[online offline away],
                  default: "offline"

      def classname
        generate_classname("pb_online_status_kit")
      end
    end
  end
end
