# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :flex_direction,
    %w[row column rowReverse columnReverse],
    ->(v) { "flex_direction_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "flex_direction_#{size}_#{v.underscore}" }
  )

  test_global_prop_absence(
    :flex_direction,
    %w[flex_direction_row flex_direction_column flex_direction_row_reverse flex_direction_column_reverse]
  )
end
