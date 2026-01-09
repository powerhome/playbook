# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"
require_relative "../../../app/pb_kits/playbook/pb_button/button"
require_relative "../../../app/pb_kits/playbook/pb_card/card"
require_relative "../../../app/pb_kits/playbook/pb_title/title"
require_relative "../../../app/pb_kits/playbook/pb_text_input/text_input"
require_relative "../../../app/pb_kits/playbook/pb_flex/flex"
require_relative "../../../app/pb_kits/playbook/pb_link/link"
require_relative "../../../app/pb_kits/playbook/pb_badge/badge"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :display,
    %w[block inline_block inline flex inline_flex none grid],
    ->(v) { "display_#{v}" },
    responsive_pattern: ->(size, v) { "display_#{size}_#{v}" },
    test_subjects: [
      Playbook::PbBody::Body,
      Playbook::PbButton::Button,
      Playbook::PbCard::Card,
      Playbook::PbTitle::Title,
      Playbook::PbTextInput::TextInput,
      Playbook::PbFlex::Flex,
      Playbook::PbLink::Link,
      Playbook::PbBadge::Badge,
    ]
  )

  test_global_prop_absence(
    :display,
    %w[display_block display_inline display_flex display_none display_grid]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :display,
    ["invalid", "bad_value", "not_a_display_value", "special-chars!@#", "display_with_underscores"],
    %w[display_invalid display_bad_value display_not_a_display_value display_special-chars!@# display_display_with_underscores],
    allow_errors: true
  )
end
