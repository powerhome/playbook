# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_donut_chart/donut_chart"

RSpec.describe Playbook::PbDonutChart::DonutChart do
  subject { Playbook::PbDonutChart::DonutChart }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
