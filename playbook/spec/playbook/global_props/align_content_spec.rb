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

  test_global_prop_absence(
    :align_content,
    %w[align_content_start align_content_center align_content_end align_content_space_between align_content_space_around align_content_space_evenly]
  )
end
