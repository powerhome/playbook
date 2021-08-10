# frozen_string_literal: true

module Playbook
  module PbCaption
    class Caption < Playbook::KitBase
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md base lg xl],
                  default: "md"
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p span div caption],
                 default: "div"
      prop :text
      prop :variant, type: Playbook::Props::Enum,
                     values: [nil, "link"],
                     default: nil

      def classname
        generate_classname("pb_caption_kit", size, variant)
      end
    end
  end
end
