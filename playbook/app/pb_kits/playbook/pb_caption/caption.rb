# frozen_string_literal: true

module Playbook
  module PbCaption
    class Caption < Playbook::KitBase
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs md lg],
                  default: "md"
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p span div caption],
                 default: "div"
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: [nil, "link"],
                     default: nil,
                     deprecated: true

      prop :color, type: Playbook::Props::Enum,
                   values: [nil, "default", "light", "lighter", "success", "error", "link"],
                   default: nil

      def classname
        generate_classname("pb_caption_kit", size, variant, color)
      end
    end
  end
end
