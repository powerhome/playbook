# frozen_string_literal: true

module Playbook
  module PbImage
    class Image
      include Playbook::Props

      partial "pb_image/image"

      prop :alt
      prop :url

      def classname
        generate_classname("pb_image_kit lazyload blur_up")
      end
    end
  end
end
