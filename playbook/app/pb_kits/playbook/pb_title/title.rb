# frozen_string_literal: true

module Playbook
  module PbTitle
    class Title
      include Playbook::Props

      partial "pb_title/title"

      prop :size, type: Playbook::Props::Enum,
                  values: [1, 2, 3, 4],
                  default: 3
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p div span],
                 default: "h3"
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: [nil, "link"],
                     default: nil

      def classname
        generate_classname("pb_title_kit", size, variant)
      end
    end
  end
end
