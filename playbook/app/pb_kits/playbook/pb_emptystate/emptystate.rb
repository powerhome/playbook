# frozen_string_literal: true

module Playbook
  module PbEmptystate
    class Emptystate < ::Playbook::KitBase
      prop :alignment, type: Playbook::Props::Enum, values: %w[center left right], default: "center"
      prop :description, type: Playbook::Props::String
      prop :header, type: Playbook::Props::String
      prop :image, type: Playbook::Props::String
      prop :link_button, type: Playbook::Props::String
      prop :orientation, type: Playbook::Props::Enum, values: %w[horizontal vertical], default: "vertical"
      prop :primary_button, type: Playbook::Props::String
      prop :size, type: Playbook::Props::Enum, values: %w[sm md lg], default: "md"

      def data
        Hash(prop(:data)).merge(pb_emptystate: true)
      end

      def classname
        generate_classname("pb_emptystate")
      end
    end
  end
end
