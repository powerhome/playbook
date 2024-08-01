# frozen_string_literal: true

module Playbook
  module PbOnlineStatus
    class OnlineStatus < Playbook::KitBase
      prop :status, type: Playbook::Props::Enum,
                    values: %w[online offline away success warning error info neutral primary],
                    default: "offline"

      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "sm"

      prop :no_border, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_online_status_kit", status, is_no_border, size)
      end

      def is_no_border
        no_border ? "no_border" : nil
      end
    end
  end
end
