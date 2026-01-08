# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"
require_relative "../../../app/pb_kits/playbook/pb_button/button"
require_relative "../../../app/pb_kits/playbook/pb_card/card"
require_relative "../../../app/pb_kits/playbook/pb_title/title"
require_relative "../../../app/pb_kits/playbook/pb_flex/flex"
require_relative "../../../app/pb_kits/playbook/pb_link/link"
require_relative "../../../app/pb_kits/playbook/pb_badge/badge"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  # NOTE: TextInput excluded - flex_direction is a flexbox property that doesn't apply to form inputs
  test_global_prop(
    :flex_direction,
    %w[row column rowReverse columnReverse],
    ->(v) { "flex_direction_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "flex_direction_#{size}_#{v.underscore}" },
    test_subjects: [
      Playbook::PbBody::Body,
      Playbook::PbButton::Button,
      Playbook::PbCard::Card,
      Playbook::PbTitle::Title,
      Playbook::PbFlex::Flex,
      Playbook::PbLink::Link,
      Playbook::PbBadge::Badge,
    ]
  )

  test_global_prop_absence(
    :flex_direction,
    %w[flex_direction_row flex_direction_column flex_direction_row_reverse flex_direction_column_reverse]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :flex_direction,
    ["invalid", "bad_value", "not_a_direction", "special-chars!@#"],
    %w[flex_direction_invalid flex_direction_bad_value flex_direction_not_a_direction flex_direction_special-chars!@#],
    allow_errors: true
  )
end
