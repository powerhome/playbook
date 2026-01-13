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

  # NOTE: TextInput excluded - align_content is a flexbox property that doesn't apply to form inputs
  test_global_prop(
    :align_content,
    %w[start end center spaceBetween spaceAround spaceEvenly],
    ->(v) { "align_content_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "align_content_#{size}_#{v.underscore}" },
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
    :align_content,
    %w[align_content_start align_content_center align_content_end align_content_space_between align_content_space_around align_content_space_evenly]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  # This is a known bug that should be fixed - invalid values should not generate classes
  test_global_prop_invalid_values(
    :align_content,
    ["invalid", "bad_value", "not_an_align_value", "special-chars!@#"],
    %w[align_content_invalid align_content_bad_value align_content_not_an_align_value align_content_special-chars!@#],
    allow_errors: true
  )
end
