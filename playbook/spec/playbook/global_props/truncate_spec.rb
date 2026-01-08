# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :truncate,
    %w[1 2 3 4 5],
    ->(v) { "truncate_#{v}" }
  )

  test_global_prop_absence(
    :truncate,
    %w[truncate_0 truncate_1 truncate_2 truncate_3 truncate_4 truncate_5],
    exclude_zero: true
  )
end
