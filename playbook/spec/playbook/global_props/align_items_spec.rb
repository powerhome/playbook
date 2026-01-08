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

  # NOTE: TextInput excluded - align_items is a flexbox property that doesn't apply to form inputs
  test_global_prop(
    :align_items,
    %w[flexStart flexEnd start end center baseline stretch],
    ->(v) { "align_items_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "align_items_#{size}_#{v.underscore}" },
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
    :align_items,
    %w[align_items_flex_start align_items_flex_end align_items_start align_items_end align_items_center align_items_baseline align_items_stretch]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :align_items,
    ["invalid", "bad_value", "not_an_align_value", "special-chars!@#"],
    %w[align_items_invalid align_items_bad_value align_items_not_an_align_value align_items_special-chars!@#],
    allow_errors: true
  )
end
