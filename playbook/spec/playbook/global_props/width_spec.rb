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

  # NOTE: width, min_width, and max_width are implemented in Rails but only accept specific values
  # Allowed values: %w[0% xs sm md lg xl xxl 0 none 100%]
  # Tests use only the allowed values from Spacing module

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

  test_global_prop(
    :width,
    ["100%", "0%", "xs", "sm", "md", "lg", "xl", "xxl", "0", "none"],
    ->(v) { "width_#{v.gsub('%', '_percent')}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :min_width,
    ["100%", "0%", "xs", "sm", "md", "lg", "xl", "xxl", "0", "none"],
    ->(v) { "min_width_#{v.gsub('%', '_percent')}" },
    test_subjects: test_subjects
  )

  test_global_prop(
    :max_width,
    ["100%", "0%", "xs", "sm", "md", "lg", "xl", "xxl", "0", "none"],
    ->(v) { "max_width_#{v.gsub('%', '_percent')}" },
    test_subjects: test_subjects
  )

  test_global_prop_absence(
    :width,
    %w[width_100_percent width_0_percent width_xs width_sm]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :width,
    ["invalid", "bad_value", "not_a_width", "special-chars!@#"],
    %w[width_invalid width_bad_value width_not_a_width width_special-chars!@#],
    allow_errors: true
  )
end
