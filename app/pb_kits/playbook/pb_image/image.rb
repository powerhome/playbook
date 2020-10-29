# frozen_string_literal: true

module Playbook
  module PbImage
    class Image
      include Playbook::Props

      partial "pb_image/image"

      prop :alt
      prop :rounded, type: Playbook::Props::Boolean,
                     default: false
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg xl],
                  default: "md"
      prop :url

      def classname
        generate_classname("pb_image_kit lazyload blur_up", size) + rounded_class
      end

    private

      def rounded_class
        rounded ? " rounded" : ""
      end
    end
  end
end
