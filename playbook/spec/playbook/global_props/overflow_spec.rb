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

  valid_values = %w[scroll visible hidden auto]

  test_global_prop(
    :overflow,
    valid_values,
    ->(v) { "overflow_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :overflow_x,
    valid_values,
    ->(v) { "overflow_x_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :overflow_y,
    valid_values,
    ->(v) { "overflow_y_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop_absence(
    :overflow,
    %w[overflow_scroll overflow_visible overflow_hidden overflow_auto]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :overflow,
    ["invalid", "bad_value", "not_an_overflow", "special-chars!@#"],
    %w[overflow_invalid overflow_bad_value overflow_not_an_overflow overflow_special-chars!@#],
    allow_errors: true
  )
end
