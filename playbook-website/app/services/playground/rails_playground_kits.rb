# frozen_string_literal: true

module Playground
  module RailsPlaygroundKits
    POC_KITS = %w[
      button
      badge
      caption
      icon
      title
      card
      flex
      checkbox
      text_input
      dialog
      dropdown
    ].freeze

    MOCK_DATA_KITS = %w[advanced_table full_screen].freeze

    # Kits that may appear as nested pb_rails / JSX children in playground block content.
    CHILD_KIT_ROOTS = (POC_KITS + %w[body]).freeze

    def self.allowed_child_kit?(kit_name)
      root = kit_name.to_s.split("/").first
      CHILD_KIT_ROOTS.include?(root)
    end
  end
end
