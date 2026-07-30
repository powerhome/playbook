# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"
require_relative "../../../app/pb_kits/playbook/pb_button/button"
require_relative "../../../app/pb_kits/playbook/pb_card/card"
require_relative "../../../app/pb_kits/playbook/pb_title/title"
require_relative "../../../app/pb_kits/playbook/pb_flex/flex"
require_relative "../../../app/pb_kits/playbook/pb_link/link"
require_relative "../../../app/pb_kits/playbook/pb_badge/badge"

RSpec.describe Playbook::JustifyItems do
  subject { Playbook::PbBody::Body }

  test_subjects = [
    Playbook::PbBody::Body,
    Playbook::PbButton::Button,
    Playbook::PbCard::Card,
    Playbook::PbTitle::Title,
    Playbook::PbFlex::Flex,
    Playbook::PbLink::Link,
    Playbook::PbBadge::Badge,
  ]

  test_global_prop(
    :justify_items,
    %w[start end center stretch],
    ->(v) { "justify_items_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "justify_items_#{size}_#{v.underscore}" },
    test_subjects: test_subjects
  )

  test_global_prop_absence(
    :justify_items,
    %w[justify_items_start justify_items_end justify_items_center justify_items_stretch]
  )

  test_global_prop_invalid_values(
    :justify_items,
    ["invalid", "bad_value", "not_a_justify_value", "special-chars!@#"],
    %w[justify_items_invalid justify_items_bad_value justify_items_not_a_justify_value justify_items_special-chars!@#],
    allow_errors: true
  )
end
