# frozen_string_literal: true

module Playbook
  module PbCaption
    class Caption
      include Playbook::Props

      partial "pb_caption/caption"

      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md base lg xl],
                  default: "md"
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p span div],
                 default: "div"
      prop :text

      def classname
        generate_classname("pb_caption_kit", size)
      end
    end
  end
end
