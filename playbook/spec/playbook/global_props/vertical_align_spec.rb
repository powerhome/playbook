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
    :vertical_align,
    %w[baseline super top middle bottom sub text-top text-bottom],
    ->(v) { "vertical_align_#{v.tr('-', '_')}" },
    responsive_pattern: ->(size, v) { "vertical_align_#{size}_#{v.tr('-', '_')}" },
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
    :vertical_align,
    %w[vertical_align_baseline vertical_align_top vertical_align_middle vertical_align_bottom]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :vertical_align,
    ["invalid", "bad_value", "not_an_alignment", "special-chars!@#"],
    %w[vertical_align_invalid vertical_align_bad_value vertical_align_not_an_alignment vertical_align_special-chars!@#],
    allow_errors: true
  )
end
