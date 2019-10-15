# frozen_string_literal: true

module Playbook
  module PbLoadingInline
    class LoadingInline
      include Playbook::Props

       partial "pb_loading_inline/loading_inline"

       prop :align, type: Playbook::Props::Enum,
                    values: %w[left center right],
                    default: "left"
       prop :dark, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_loading_inline_kit", align)
      end
    end
  end
end
