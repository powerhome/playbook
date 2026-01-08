# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"
require_relative "../../../app/pb_kits/playbook/pb_button/button"
require_relative "../../../app/pb_kits/playbook/pb_card/card"
require_relative "../../../app/pb_kits/playbook/pb_title/title"
require_relative "../../../app/pb_kits/playbook/pb_flex/flex"
require_relative "../../../app/pb_kits/playbook/pb_link/link"
require_relative "../../../app/pb_kits/playbook/pb_badge/badge"

RSpec.describe Playbook::FlexGrow do
  subject { Playbook::PbBody::Body }

  # NOTE: TextInput excluded - flex_shrink is a flexbox property that doesn't apply to form inputs
  test_global_prop(
    :flex_shrink,
    [0, 1],
    ->(v) { "flex_shrink_#{v}" },
    responsive_pattern: ->(size, v) { "flex_shrink_#{size}_#{v}" },
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
    :flex_shrink,
    %w[flex_shrink_0 flex_shrink_1]
  )
end
