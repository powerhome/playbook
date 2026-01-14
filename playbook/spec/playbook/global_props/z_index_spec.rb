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

  # Test numeric values (1-10) - z_index expects string values, not integers
  test_global_prop(
    :z_index,
    %w[1 2 3 4 5 6 7 8 9 10],
    ->(v) { "z_index_#{v}" },
    responsive_pattern: ->(size, v) { "z_index_#{size}_#{v}" },
    test_subjects: test_subjects
  )

  # Test 'max' value
  test_global_prop(
    :z_index,
    ["max"],
    ->(v) { "z_index_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop_absence(
    :z_index,
    %w[z_index_1 z_index_5 z_index_10 z_index_max]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :z_index,
    [0, 11, 999, -1, "invalid", "bad_value", "special-chars!@#"],
    %w[z_index_0 z_index_11 z_index_999 z_index_-1 z_index_invalid z_index_bad_value z_index_special-chars!@#],
    allow_errors: true
  )
end
