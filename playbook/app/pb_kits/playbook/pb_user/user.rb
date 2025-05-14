# frozen_string_literal: true

module Playbook
  module PbUser
    class User < Playbook::KitBase
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :avatar, type: Playbook::Props::Boolean,
                    default: false
      prop :avatar_grayscale, type: Playbook::Props::Boolean, default: false
      prop :avatar_url
      prop :bold, type: Playbook::Props::Boolean, default: true
      prop :name
      prop :name_style, type: Playbook::Props::Enum,
                        values: %w[title body caption detail],
                        default: "title"
      prop :orientation, type: Playbook::Props::Enum,
                         values: %w[vertical horizontal],
                         default: "horizontal"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[lg md sm],
                  default: "sm"
      prop :subtitle
      prop :title
      prop :title_style, type: Playbook::Props::Enum,
                         values: %w[body caption detail],
                         default: "body"
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

      def name_size
        if name_style == "caption"
          size == "sm" ? "xs" : size
        else
          size == "lg" ? 3 : 4
        end
      end

      def title_size
        if title_style == "caption"
          size == "sm" ? "xs" : size
        end
      end

      def details
        [territory, title].reject(&:blank?).join(" • ")
      end
    end
  end
end
