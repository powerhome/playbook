# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :align_content,
    %w[start end center spaceBetween spaceAround spaceEvenly],
    ->(v) { "align_content_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "align_content_#{size}_#{v.underscore}" }
  )
end
