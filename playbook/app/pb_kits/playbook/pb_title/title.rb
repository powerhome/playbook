# frozen_string_literal: true

module Playbook
  module PbTitle
    class Title < Playbook::KitBase
      prop :color, type: Playbook::Props::Enum,
                   values: %w[default light lighter success error link],
                   default: "default"
      prop :size, type: Playbook::Props::Enum,
                  values: [1, 2, 3, 4],
                  default: 3
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p div span],
                 default: "h3"
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: [nil, "link"],
                     default: nil,
                     deprecated: true

      def classname
        generate_classname("pb_title_kit", size, variant, color)
      end
    end
  end
end
