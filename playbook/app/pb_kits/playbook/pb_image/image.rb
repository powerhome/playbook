# frozen_string_literal: true

module Playbook
  module PbImage
    class Image < Playbook::KitBase
      prop :alt
      prop :on_error, type: Playbook::Props::String,
                      default: nil
      prop :rounded, type: Playbook::Props::Boolean,
                     default: false
      prop :size, type: Playbook::Props::Enum,
                  values: %w[xs sm md lg xl none],
                  default: "none"
      prop :transition, type: Playbook::Props::Enum,
                        values: %w[blur fade scale none],
                        default: "none"
      prop :url

      def classname
        generate_classname("pb_image_kit#{size_class} #{transition_class} lazyload") + rounded_class
      end

    private

      def rounded_class
        rounded ? " rounded" : ""
      end

      def size_class
        size == "none" ? nil : "_#{size}"
      end

      def transition_class
        transition == "none" ? nil : transition.to_s
      end
    end
  end
end
