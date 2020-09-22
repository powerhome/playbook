# frozen_string_literal: true

module Playbook
  module PbBackground
    class Background
      include Playbook::Props

      partial "pb_background/background"

      prop :background_color, type: Playbook::Props::Enum,
                              values: %w[bg_gradient bg_dark bg_light white],
                              default: "bg_light"
      prop :image_url
      prop :tag
      prop :padding, type: Playbook::Props::Enum,
                     values: %w[none xs sm md lg xl],
                     default: "md"
      prop :text, type: Playbook::Props::String

      def classname
        generate_classname("pb_background_kit" + " " + padding )
      end

      def classname_without_image
        generate_classname("pb_background_kit" + " " + padding + " " + background_color )
      end

    end
  end
end
