# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :flex_wrap,
    %w[wrap nowrap wrapReverse],
    ->(v) { "flex_wrap_#{v}" },
    responsive_pattern: ->(size, v) { "flex_wrap_#{size}_#{v.underscore}" }
  )

  test_global_prop_absence(
    :flex_wrap,
    %w[flex_wrap_wrap flex_wrap_nowrap flex_wrap_wrap_reverse]
  )
end
