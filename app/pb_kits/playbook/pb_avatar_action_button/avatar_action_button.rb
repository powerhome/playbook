# frozen_string_literal: true

module Playbook
  module PbAvatarActionButton
    class AvatarActionButton
      include Playbook::Props

      prop :action, type: Playbook::Props::String,
                    default: "add"
      prop :image_url, type: Playbook::Props::String
      prop :link_url, type: Playbook::Props::String
      prop :tooltip_text, type: Playbook::Props::String
      prop :tooltip_id, type: Playbook::Props::String
      prop :name, type: Playbook::Props::String,
                  default: ""
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg xl],
                  default: "md"
      prop :placement, type: Playbook::Props::String,
                       default: "bottom_left"

      partial "pb_avatar_action_button/avatar_action_button"

      def classname
        generate_classname("pb_avatar_action_button_kit", action, size, placement)
      end

      def action_icons
        icon_hash = {
          add: "plus-circle",
          remove: "times-circle",
        }
        # if an 'action' prop is passed that isn't
        # in the icon_hash an empty string is returned
        # instead of a null value, which would break the page

        # double pipe ruby syntax below is essentially a reduced if-else statement
        # if icon_hash[action.to_sym] returns a falsey value, return "" instead
        icon_hash[action.to_sym] ||= ""
      end
    end
  end
end
