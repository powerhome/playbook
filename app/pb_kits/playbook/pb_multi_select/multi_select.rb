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

      def classname
        generate_classname("pb_multi_select_kit", "primary", name, text)
      end

      def display_text
        name.downcase
      end
    end
  end
end
