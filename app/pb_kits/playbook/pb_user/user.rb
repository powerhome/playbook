# frozen_string_literal: true

module Playbook
  module PbUser
    class User
      include Playbook::Props

      partial "pb_user/user"

      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :avatar, type: Playbook::Props::Boolean,
                    default: false
      prop :avatar_url
      prop :name
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg md sm],
                  default: "sm"
      prop :title
      prop :dark, type: Playbook::Props::Boolean,
                          default: false

      def classname
        generate_classname("pb_user_kit", align, orientation, size, dark_class)
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

      def dark_class
        dark ? "dark" : nil
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
