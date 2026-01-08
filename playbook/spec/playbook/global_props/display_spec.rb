# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :display,
    %w[block inline_block inline flex inline_flex none grid],
    ->(v) { "display_#{v}" },
    responsive_pattern: ->(size, v) { "display_#{size}_#{v}" }
  )

  test_global_prop_absence(
    :display,
    %w[display_block display_inline display_flex display_none display_grid]
  )
end
