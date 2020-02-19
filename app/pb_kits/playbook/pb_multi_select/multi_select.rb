module Playbook
  module PbMultiSelect
    class MultiSelect
      include Playbook::Props

      partial "pb_multi_select/multi_select"

      prop :avatar, type: Playbook::Props::Boolean,
                    default: false
      prop :avatar_url
      prop :name
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[success warning error info neutral primary],
                     default: "neutral"

      def classname
        generate_classname("pb_multi_select_kit", variant)
      end

      def display_text
        text.downcase
      end
    end
  end
end
