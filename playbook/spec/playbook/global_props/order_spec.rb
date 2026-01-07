# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :order,
    (1..12).to_a,
    ->(v) { "flex_order_#{v}" },
    responsive_pattern: ->(size, v) { "order_#{size}_#{v}" }
  )
end
