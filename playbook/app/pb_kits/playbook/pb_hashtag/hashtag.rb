# frozen_string_literal: true

module Playbook
  module PbHashtag
    class Hashtag < Playbook::KitBase
      prop :new_window, type: Playbook::Props::Boolean,
                        default: false
      prop :text
      prop :type, type: Playbook::Props::Enum,
                  values: %w[default project home appointment],
                  default: "default"
      prop :url
      prop :target

      def classname
        generate_classname("pb_hastag_kit")
      end

      def hashtag_text
        type_text + text
      end

      def target_option
        if target && url
          target
        elsif new_window
          "_blank"
        else
          "_self"
        end
      end

    private

      def type_text
        if type === "home"
          "H#"
        elsif type === "project"
          "P#"
        elsif type === "appointment"
          "A#"
        else
          "#"
        end
      end
    end
  end
end
