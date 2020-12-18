# frozen_string_literal: true

module Playbook
  module PbImage
    class Image < Playbook::KitBase
      prop :alt
      prop :rounded, type: Playbook::Props::Boolean,
                     default: false
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg xl none],
                  default: "none"
      prop :url

      def classname
        generate_classname("pb_image_kit lazyload blur_up", size_class) + rounded_class
      end

    private

      def rounded_class
        rounded ? " rounded" : ""
      end

      def size_class
        size == "none" ? nil : size
      end
    end
  end
end
