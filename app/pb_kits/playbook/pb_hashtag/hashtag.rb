# frozen_string_literal: true

module Playbook
  module PbHashtag
    class Hashtag
      include Playbook::Props

      partial "pb_hashtag/hashtag"

      prop :text
      prop :type, type: Playbook::Props::Enum,
                  values: %w[default project home],
                  default: "default"
      prop :url

      def classname
        generate_classname("pb_hastag_kit")
      end

      def hashtag_text
        type_text + text
      end

    private

      def type_text
        if type === "home"
          "H#"
        elsif type === "project"
          "P#"
        else
          "#"
        end
      end
    end
  end
end
