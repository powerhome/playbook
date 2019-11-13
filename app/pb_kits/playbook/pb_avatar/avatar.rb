# frozen_string_literal: true

module Playbook
  module PbAvatar
    class Avatar
      include Playbook::Props

      partial "pb_avatar/avatar"

      prop :image_url
      prop :name, default: ""
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md base lg xl],
                  default: "md"
      prop :status

      def initials
        name.split.map(&:first).join.downcase
      end

      def classname
        generate_classname("pb_avatar_kit", size)
      end

      def online_status_props
        { status: status, classname: "size_#{size}" }
      end
    end
  end
end
