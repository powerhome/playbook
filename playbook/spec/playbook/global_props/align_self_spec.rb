# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"
require_relative "../../../app/pb_kits/playbook/pb_button/button"
require_relative "../../../app/pb_kits/playbook/pb_card/card"
require_relative "../../../app/pb_kits/playbook/pb_title/title"
require_relative "../../../app/pb_kits/playbook/pb_link/link"
require_relative "../../../app/pb_kits/playbook/pb_badge/badge"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  # NOTE: TextInput excluded - align_self is a flexbox property that doesn't apply to form inputs
  # NOTE: Flex excluded - Flex has its own align_self prop with different valid values (no 'auto' or 'baseline')
  test_global_prop(
    :align_self,
    %w[auto start end center stretch baseline],
    ->(v) { "align_self_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "align_self_#{size}_#{v.underscore}" },
    test_subjects: [
      Playbook::PbBody::Body,
      Playbook::PbButton::Button,
      Playbook::PbCard::Card,
      Playbook::PbTitle::Title,
      Playbook::PbLink::Link,
      Playbook::PbBadge::Badge,
    ]
  )

  test_global_prop_absence(
    :align_self,
    %w[align_self_auto align_self_start align_self_end align_self_center align_self_stretch align_self_baseline]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :align_self,
    ["invalid", "bad_value", "not_an_align_value", "special-chars!@#"],
    %w[align_self_invalid align_self_bad_value align_self_not_an_align_value align_self_special-chars!@#],
    allow_errors: true
  )
end
