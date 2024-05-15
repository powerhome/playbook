# frozen_string_literal: true

module Playbook
  module PbLoadingInline
    class LoadingInline < Playbook::KitBase
      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :dark, type: Playbook::Props::Boolean, default: false
      prop :text, type: Playbook::Props::String, default: "Loading"

      def classname
        generate_classname("pb_loading_inline_kit", align)
      end
    end
  end
end
