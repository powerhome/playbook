# frozen_string_literal: true

module Playbook
  module PbAvatar
    class Avatar
      include Playbook::Props

      partial "pb_avatar/avatar"

      prop :image, type: Playbook::Props::Hash, default: {}
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

      # def status
      #   if is_set? configured_status
      #     online_status_props = { status: configured_status, classname: "size_#{size}" }
      #     pb_status = Playbook::PbOnlineStatus::OnlineStatus.new(online_status_props)
      #     ApplicationController.renderer.render(partial: pb_status, as: :object)
      #   end
      # end


    end
  end
end
