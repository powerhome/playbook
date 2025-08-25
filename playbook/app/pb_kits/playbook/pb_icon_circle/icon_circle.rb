# frozen_string_literal: true

module Playbook
  module PbIconCircle
    class IconCircle < Playbook::KitBase
      prop :icon, required: true
      prop :emoji, type: Playbook::Props::String,
                   default: ""
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xxs xs sm md base lg xl],
                  default: "md"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[default royal blue orange purple teal red yellow green orange lighter],
                     default: "default"

      def classname
        generate_classname("pb_icon_circle_kit", "size_#{size}", variant)
      end
    end
  end
end
