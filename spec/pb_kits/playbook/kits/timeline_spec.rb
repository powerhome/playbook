# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_timeline/timeline"

RSpec.describe Playbook::PbTimeline::Timeline do
  subject { Playbook::PbTimeline::Timeline }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
