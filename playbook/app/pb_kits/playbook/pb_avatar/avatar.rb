# frozen_string_literal: true

module Playbook
  module PbAvatar
    class Avatar < Playbook::KitBase
      prop :image_url, type: Playbook::Props::String
      prop :image_alt, type: Playbook::Props::String,
                       default: ""
      prop :name, type: Playbook::Props::String,
                  default: ""
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xxs xs sm md base lg xl],
                  default: "md"
      prop :status

      def initials
        name.split.map(&:first).join.downcase
      end

      def classname
        generate_classname("pb_avatar_kit", "size_#{size}")
      end

      def online_status_props
        { status: status, classname: "size_#{size}" }
      end

      def handle_img_error
        "this.style.display = 'none'"
      end
    end
  end
end
