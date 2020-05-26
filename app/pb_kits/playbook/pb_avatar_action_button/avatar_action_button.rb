# frozen_string_literal: true

module Playbook
  module PbAvatarActionButton
    class AvatarActionButton
      include Playbook::Props

      prop :image_url, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String,
                  default: ""
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md base lg xl],
                  default: "md"
      prop :icon, type: Playbook::Props::String,
                  default: "user"

      partial "pb_avatar_action_button/avatar_action_button"

      def classname
        generate_classname("pb_avatar_action_button_kit")
      end
    end
  end
end
