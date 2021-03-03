# frozen_string_literal: true

module Playbook
  module PbTextInput
    class AddOn < Playbook::KitBase
      prop :icon, type: Playbook::Props::String, required: true
      prop :alignment, type: Playbook::Props::Enum, values: %w[right left], default: "right"
      prop :border, type: Playbook::Props::Boolean, default: true
    end
  end
end
