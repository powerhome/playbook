# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_bar_graph/bar_graph"

RSpec.describe Playbook::PbBarGraph::BarGraph do
  subject { Playbook::PbBarGraph::BarGraph }

  it { is_expected.to define_partial }
end
