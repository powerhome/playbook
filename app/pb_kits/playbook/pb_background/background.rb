# frozen_string_literal: true

module Playbook
  module PbBackground
    class Background
      include Playbook::Props

      partial "pb_background/background"

      prop :color, type: Playbook::Props::Enum,
                   values: %w[gradient bg_dark bg_light]
                   #defult:
      prop :image_url
      prop :tag, #default: "div"

      def classname
        generate_classname("pb_background_kit", color)
      end

    end
  end
end
