# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_gauge/gauge"

RSpec.describe Playbook::PbGauge::Gauge do
  subject { Playbook::PbGauge::Gauge }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
