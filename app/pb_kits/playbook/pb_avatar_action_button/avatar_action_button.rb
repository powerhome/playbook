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
                  values: %w[xs sm md base lg xl],
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
          edit: "pencil-circle",
          exclamation: "exclamation-circle",
          heart: "heart-circle",
          info: "info-circle",
          minus: "minus-circle",
          question: "question-circle",
          remove: "times-circle",
          sort: "sort-circle",
        }

        icon_hash[action.to_sym]
      end
    end
  end
end
