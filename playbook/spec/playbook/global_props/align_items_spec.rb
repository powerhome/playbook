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

  test_global_prop_absence(
    :align_items,
    %w[align_items_flex_start align_items_flex_end align_items_start align_items_end align_items_center align_items_baseline align_items_stretch]
  )
end
