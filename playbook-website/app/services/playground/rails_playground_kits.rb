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
      body
      detail
      hashtag
      highlight
      icon_circle
      icon_value
      image
      label_pill
      label_value
      link
      pill
      source
      title_count
      title_detail
      currency
      dashboard_value
      distribution_bar
      empty_state
      icon_stat_value
      legend
      loading_inline
      progress_pills
      progress_simple
      progress_step
      section_separator
      skeleton_loading
      stat_change
      stat_value
    ].freeze

    MOCK_DATA_KITS = %w[advanced_table full_screen].freeze

    # Full kit paths allowed as nested pb_rails / JSX children (not just the root segment).
    ALLOWED_CHILD_KITS = (
      POC_KITS + %w[
        card/card_header
        card/card_body
        card/card_footer
        dialog/dialog_header
        dialog/dialog_body
        dialog/dialog_footer
        flex/flex_item
        progress_step/progress_step_item
      ]
    ).freeze

    def self.allowed_child_kit?(kit_name)
      ALLOWED_CHILD_KITS.include?(kit_name.to_s)
    end
  end
end
