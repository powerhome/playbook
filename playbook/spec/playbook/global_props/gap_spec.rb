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

  test_subjects = [
    Playbook::PbBody::Body,
    Playbook::PbButton::Button,
    Playbook::PbCard::Card,
    Playbook::PbTitle::Title,
    Playbook::PbTextInput::TextInput,
    Playbook::PbFlex::Flex,
    Playbook::PbLink::Link,
    Playbook::PbBadge::Badge,
  ]

  valid_values = %w[xs sm md lg xl]

  test_global_prop(
    :gap,
    valid_values,
    ->(v) { "gap_#{v}" },
    responsive_pattern: ->(size, v) { "gap_#{size}_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :column_gap,
    valid_values,
    ->(v) { "column_gap_#{v}" },
    responsive_pattern: ->(size, v) { "column_gap_#{size}_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :row_gap,
    valid_values,
    ->(v) { "row_gap_#{v}" },
    responsive_pattern: ->(size, v) { "row_gap_#{size}_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop_absence(
    :gap,
    %w[gap_xs gap_sm gap_md gap_lg gap_xl]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :gap,
    ["invalid", "bad_value", "not_a_size", "special-chars!@#"],
    %w[gap_invalid gap_bad_value gap_not_a_size gap_special-chars!@#],
    allow_errors: true
  )
end
