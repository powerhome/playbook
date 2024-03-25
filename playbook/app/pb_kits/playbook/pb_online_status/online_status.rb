# frozen_string_literal: true

module Playbook
  module PbOnlineStatus
    class OnlineStatus < Playbook::KitBase
      prop :status, type: Playbook::Props::Enum,
                    values: %w[online offline away success warning error info neutral primary],
                    default: "offline"

      def classname
        generate_classname("pb_online_status_kit", status)
      end
    end
  end
end
