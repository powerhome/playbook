# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::FlexGrow do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :flex_shrink,
    [0, 1],
    ->(v) { "flex_shrink_#{v}" },
    responsive_pattern: ->(size, v) { "flex_shrink_#{size}_#{v}" }
  )

  test_global_prop_absence(
    :flex_shrink,
    %w[flex_shrink_0 flex_shrink_1]
  )
end
