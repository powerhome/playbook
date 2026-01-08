# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :justify_self,
    %w[auto start end center stretch],
    ->(v) { "justify_self_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "justify_self_#{size}_#{v.underscore}" }
  )

  test_global_prop_absence(
    :justify_self,
    %w[justify_self_auto justify_self_start justify_self_end justify_self_center justify_self_stretch]
  )
end
