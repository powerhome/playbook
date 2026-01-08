# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :flex,
    (0..12).to_a,
    ->(v) { "flex_#{v}" },
    responsive_pattern: ->(size, v) { "flex_#{size}_#{v}" }
  )

  test_global_prop(
    :flex,
    %w[auto initial none],
    ->(v) { "flex_#{v}" },
    responsive_pattern: ->(size, v) { "flex_#{size}_#{v.underscore}" }
  )

  test_global_prop_absence(
    :flex,
    %w[flex_0 flex_1 flex_12 flex_auto flex_initial flex_none]
  )
end
