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

  # NOTE: TextInput excluded - flex_wrap is a flexbox property that doesn't apply to form inputs
  test_global_prop(
    :flex_wrap,
    %w[wrap nowrap wrapReverse],
    ->(v) { "flex_wrap_#{v}" },
    responsive_pattern: ->(size, v) { "flex_wrap_#{size}_#{v.underscore}" },
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
    :flex_wrap,
    %w[flex_wrap_wrap flex_wrap_nowrap flex_wrap_wrap_reverse]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :flex_wrap,
    ["invalid", "bad_value", "not_a_wrap_value", "special-chars!@#"],
    %w[flex_wrap_invalid flex_wrap_bad_value flex_wrap_not_a_wrap_value flex_wrap_special-chars!@#],
    allow_errors: true
  )
end
