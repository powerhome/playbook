# frozen_string_literal: true

module Playbook
  module PbLoading
    class Loading
      include Playbook::Props

      partial "pb_loading/loading"

      prop :align, type: Playbook::Props::Enum,
                   values: %w[left center right],
                   default: "left"
      prop :size, type: Playbook::Props::Enum,
                  values: %w[sm md lg],
                  default: "md"
      # prop :dark, type: Playbook::Props::Boolean, default: false

      def classname
        generate_classname("pb_loading_kit", size)
      end
    end
  end
end
