# frozen_string_literal: true

module Playbook
  module PbUser
    class User < Playbook::KitBase
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :avatar, type: Playbook::Props::Boolean,
                    default: false
      prop :avatar_url
      prop :bold, type: Playbook::Props::Boolean, default: true
      prop :name
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg md sm],
                  default: "sm"
      prop :subtitle
      prop :title
      prop :territory

      def classname
        generate_classname("pb_user_kit", align, orientation, size)
      end

      def avatar_size
        case size
        when "lg"
          "xl"
        when "md"
          "md"
        else
          "sm"
        end
      end

      def title_size
        size == "lg" ? 3 : 4
      end

      def details
        [territory, title].reject(&:blank?).join(" • ")
      end
    end
  end
end
