# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::FlexGrow do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :flex_grow,
    [0, 1],
    ->(v) { "flex_grow_#{v}" },
    responsive_pattern: ->(size, v) { "flex_grow_#{size}_#{v}" }
  )
end
