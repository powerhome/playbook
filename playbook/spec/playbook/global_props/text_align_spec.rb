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

  # text_align values - basic values only (justifyAll and matchParent may not be supported in Rails)
  test_global_prop(
    :text_align,
    %w[start end left right center justify],
    ->(v) { "text_align_#{v}" },
    responsive_pattern: ->(size, v) { "text_align_#{size}_#{v}" },
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
    :text_align,
    %w[text_align_start text_align_end text_align_center text_align_left text_align_right]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :text_align,
    ["invalid", "bad_value", "not_an_alignment", "special-chars!@#"],
    %w[text_align_invalid text_align_bad_value text_align_not_an_alignment text_align_special-chars!@#],
    allow_errors: true
  )
end
