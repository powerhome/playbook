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
end
