# frozen_string_literal: true

module Playbook
  module PbSelectableCardIcon
    class SelectableCardIcon
      include Playbook::Props

      partial "pb_selectable_card_icon/selectable_card_icon"

      prop :checked, type: Playbook::Props::Boolean,
                     default: false
      prop :icon, type: Playbook::Props::String
      prop :text
      prop :title

      def classname
        generate_classname("pb_selectable_card_icon_kit", checked_class)
      end

    private

      def checked_class
        checked ? "checked" : nil
      end
    end
  end
end
