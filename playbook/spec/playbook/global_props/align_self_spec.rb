# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  test_global_prop(
    :align_self,
    %w[auto start end center stretch baseline],
    ->(v) { "align_self_#{v.underscore}" },
    responsive_pattern: ->(size, v) { "align_self_#{size}_#{v.underscore}" }
  )

  test_global_prop_absence(
    :align_self,
    %w[align_self_auto align_self_start align_self_end align_self_center align_self_stretch align_self_baseline]
  )
end
