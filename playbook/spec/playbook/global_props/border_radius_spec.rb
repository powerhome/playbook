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
    :border_radius,
    %w[none xs sm md lg xl rounded],
    ->(v) { "border_radius_#{v}" },
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
    :border_radius,
    %w[border_radius_none border_radius_xs border_radius_sm border_radius_md border_radius_lg border_radius_xl border_radius_rounded]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :border_radius,
    ["invalid", "bad_value", "not_a_radius", "special-chars!@#"],
    %w[border_radius_invalid border_radius_bad_value border_radius_not_a_radius border_radius_special-chars!@#],
    allow_errors: true
  )
end
