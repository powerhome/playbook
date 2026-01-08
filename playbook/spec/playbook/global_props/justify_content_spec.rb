# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :justify_content,
    %w[start end center spaceBetween spaceAround spaceEvenly],
    ->(v) { "justify_content_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "justify_content_#{size}_#{v.underscore}" }
  )

  test_global_prop_absence(
    :justify_content,
    %w[justify_content_start justify_content_end justify_content_center justify_content_space_between justify_content_space_around justify_content_space_evenly]
  )
end
