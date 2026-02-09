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

  valid_values = %w[none xs sm md lg xl auto initial inherit]

  test_global_prop(
    :padding,
    valid_values,
    ->(v) { "p_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :padding_x,
    valid_values,
    ->(v) { "px_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :padding_y,
    valid_values,
    ->(v) { "py_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :padding_top,
    valid_values,
    ->(v) { "pt_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :padding_bottom,
    valid_values,
    ->(v) { "pb_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :padding_left,
    valid_values,
    ->(v) { "pl_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :padding_right,
    valid_values,
    ->(v) { "pr_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop_absence(
    :padding,
    %w[p_xs p_sm p_md p_lg p_xl]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :padding,
    ["invalid", "bad_value", "not_a_size", "special-chars!@#"],
    %w[p_invalid p_bad_value p_not_a_size p_special-chars!@#],
    allow_errors: true
  )
end
