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
    :margin,
    valid_values,
    ->(v) { "m_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :margin_x,
    valid_values,
    ->(v) { "mx_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :margin_y,
    valid_values,
    ->(v) { "my_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :margin_top,
    valid_values,
    ->(v) { "mt_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :margin_bottom,
    valid_values,
    ->(v) { "mb_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :margin_left,
    valid_values,
    ->(v) { "ml_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :margin_right,
    valid_values,
    ->(v) { "mr_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop_absence(
    :margin,
    %w[m_xs m_sm m_md m_lg m_xl]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :margin,
    ["invalid", "bad_value", "not_a_size", "special-chars!@#"],
    %w[m_invalid m_bad_value m_not_a_size m_special-chars!@#],
    allow_errors: true
  )
end
