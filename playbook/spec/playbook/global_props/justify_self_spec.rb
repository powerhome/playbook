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

  # NOTE: TextInput excluded - justify_self is a flexbox property that doesn't apply to form inputs
  test_global_prop(
    :justify_self,
    %w[auto start end center stretch],
    ->(v) { "justify_self_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "justify_self_#{size}_#{v.underscore}" },
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
    :justify_self,
    %w[justify_self_auto justify_self_start justify_self_end justify_self_center justify_self_stretch]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :justify_self,
    ["invalid", "bad_value", "not_a_justify_value", "special-chars!@#"],
    %w[justify_self_invalid justify_self_bad_value justify_self_not_a_justify_value justify_self_special-chars!@#],
    allow_errors: true
  )
end
