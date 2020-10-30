# frozen_string_literal: true

module Playbook
  module PbBackground
    class Background
      include Playbook::Props

      partial "pb_background/background"

      prop :background_color, type: Playbook::Props::Enum,
                              values: %w[gradient dark light white],
                              default: "light"
      prop :image_url

      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p div span],
                 default: "div"


      def classname
        generate_classname("pb_background_kit", image_classname, background_color_classname, separator: " ")
      end

    private

      def image_classname
        image_url.present? ? "lazyload blur_up" : ""
      end

      def background_color_classname
        !image_url.present? ? "pb_background_color_#{background_color}" : ""
      end
    end
  end
end
