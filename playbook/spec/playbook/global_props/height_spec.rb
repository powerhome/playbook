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

  valid_height_values = %w[auto xs sm md lg xl xxl xxxl]

  test_global_prop(
    :height,
    valid_height_values,
    ->(v) { "height_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :min_height,
    valid_height_values,
    ->(v) { "min_height_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :max_height,
    valid_height_values,
    ->(v) { "max_height_#{v}" },
    test_subjects: test_subjects
  )

  test_global_prop_absence(
    :height,
    %w[height_auto height_xs height_sm height_md height_lg height_xl height_xxl height_xxxl]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :height,
    ["invalid", "bad_value", "not_a_height", "special-chars!@#", "100px", "50%"],
    %w[height_invalid height_bad_value height_not_a_height height_special-chars!@# height_100px height_50_percent],
    allow_errors: true
  )
end
