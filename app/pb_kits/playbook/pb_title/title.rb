# frozen_string_literal: true

module Playbook
  module PbTitle
    class Title
      include Playbook::Props

      partial "pb_title/title"

      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :size, type: Playbook::Props::Enum,
                  values: [1, 2, 3, 4],
                  default: 3
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p div span],
                 default: "h3"
      prop :text
      prop :variant, type: Playbook::Props::Boolean,
                  default: false

      def classname
        generate_classname("pb_title_kit", size, dark_class, variant_class)
      end

    private

      def dark_class
        dark ? "dark" : nil
      end

      def variant_class
        variant ? "primary" : nil
      end
    end
  end
end
