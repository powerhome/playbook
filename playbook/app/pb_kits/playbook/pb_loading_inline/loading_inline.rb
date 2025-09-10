# frozen_string_literal: true

module Playbook
  module PbLoadingInline
    class LoadingInline < Playbook::KitBase
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :text, type: Playbook::Props::String, default: "Loading"
      prop :variant, type: Playbook::Props::Enum,
                     values: %w[dotted solid],
                     default: "dotted"

      def classname
        generate_classname("pb_loading_inline_kit", align)
      end

      def spinner_icon
        if variant == "dotted"
          "spinner"
        elsif variant == "solid"
          "spinner-solid"
        end
      end
    end
  end
end
