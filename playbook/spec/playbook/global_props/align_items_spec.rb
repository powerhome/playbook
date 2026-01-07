# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :align_items,
    %w[flexStart flexEnd start end center baseline stretch],
    ->(v) { "align_items_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "align_items_#{size}_#{v.underscore}" }
  )
end
