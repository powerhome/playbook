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
    :truncate,
    %w[1 2 3 4 5],
    ->(v) { "truncate_#{v}" },
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
    :truncate,
    %w[truncate_0 truncate_1 truncate_2 truncate_3 truncate_4 truncate_5],
    exclude_zero: true
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :truncate,
    [0, 6, 999, -1, "invalid", "bad_value", "special-chars!@#"],
    %w[truncate_0 truncate_6 truncate_999 truncate_-1 truncate_invalid truncate_bad_value truncate_special-chars!@#],
    allow_errors: true
  )
end
