# frozen_string_literal: true

module Playbook
  module PbImage
    class Image
      include Playbook::Props

      partial "pb_image/image"

      prop :alt
      prop :lazy, type: Playbook::Props::Boolean,
                  default: false
      prop :url

      def lazy_class
        lazy ? " lazyload" : ""
      end

      def img_data_src
        lazy ? url : nil
      end

      def img_src
        lazy ? nil : url
      end

      def classname
        generate_classname("pb_image_kit blur_up#{lazy_class}")
      end
    end
  end
end
