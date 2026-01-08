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

  # NOTE: TextInput excluded - justify_content is a flexbox property that doesn't apply to form inputs
  test_global_prop(
    :justify_content,
    %w[start end center spaceBetween spaceAround spaceEvenly],
    ->(v) { "justify_content_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "justify_content_#{size}_#{v.underscore}" },
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
    :justify_content,
    %w[justify_content_start justify_content_end justify_content_center justify_content_space_between justify_content_space_around justify_content_space_evenly]
  )
end
