# frozen_string_literal: true

module Playbook
  module PbIconCircle
    class IconCircle < Playbook::KitBase
      prop :icon
      prop :emoji, type: Playbook::Props::String,
                   default: ""
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md base lg xl],
                  default: "md"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default royal blue orange purple teal red yellow green],
                     default: "default"

      def valid_emoji(emoji)
        emoji_regex = /\p{Emoji}/
        emoji_regex.match?(emoji)
      end

      def classname
        generate_classname("pb_icon_circle_kit", size, variant)
      end
    end
  end
end
