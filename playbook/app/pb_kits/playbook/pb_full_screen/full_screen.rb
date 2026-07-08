# frozen_string_literal: true

module Playbook
  module PbFullScreen
    class FullScreen < ::Playbook::KitBase
      def classname
        generate_classname("pb_full_screen_kit")
      end
    end
  end
end
