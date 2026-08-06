# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"
require_relative "../../../app/pb_kits/playbook/pb_button/button"
require_relative "../../../app/pb_kits/playbook/pb_card/card"
require_relative "../../../app/pb_kits/playbook/pb_title/title"
require_relative "../../../app/pb_kits/playbook/pb_flex/flex"
require_relative "../../../app/pb_kits/playbook/pb_link/link"
require_relative "../../../app/pb_kits/playbook/pb_badge/badge"

RSpec.describe Playbook::GridAutoFlow do
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
    :grid_auto_flow,
    %w[row column dense rowDense columnDense],
    ->(v) { "grid_auto_flow_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "grid_auto_flow_#{size}_#{v.underscore}" },
    test_subjects: test_subjects
  )

  test_global_prop_absence(
    :grid_auto_flow,
    %w[grid_auto_flow_row grid_auto_flow_column grid_auto_flow_dense grid_auto_flow_row_dense grid_auto_flow_column_dense]
  )

  test_global_prop_invalid_values(
    :grid_auto_flow,
    ["invalid", "bad_value", "not_a_flow_value", "special-chars!@#"],
    %w[grid_auto_flow_invalid grid_auto_flow_bad_value grid_auto_flow_not_a_flow_value grid_auto_flow_special-chars!@#],
    allow_errors: true
  )
end
