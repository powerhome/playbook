# frozen_string_literal: true

module Playbook
  module PbFullScreen
    class FullScreen < ::Playbook::KitBase
      prop :content_padding, type: Playbook::Props::Enum,
                             values: %w[none xxs xs sm md lg xl],
                             default: "lg"
      prop :sticky_header, type: Playbook::Props::Boolean,
                           default: true

      def classname
        generate_classname("pb_full_screen_kit")
      end
    end
  end
end
