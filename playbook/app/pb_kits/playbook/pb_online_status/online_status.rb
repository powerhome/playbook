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
        class_names = ["pb_online_status_kit"]
        class_names << "pb_online_status_no_border" if no_border
        class_names << "pb_online_status_size_#{size}" if size
        class_names << "pb_online_status_#{status}" if status

        generate_classname(class_names.compact.join(" "), separator: " ")
      end
    end
  end
end
