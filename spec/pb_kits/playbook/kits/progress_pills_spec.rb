# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_progress_pills/progress_pills"

RSpec.describe Playbook::PbProgressPills::ProgressPills do
  subject { Playbook::PbProgressPills::ProgressPills }

  it { is_expected.to define_partial }
  it { is_expected.to define_boolean_prop(:dark)
                      .with_default(false) }

  # Do not leave this file blank. Use other spec files for example tests.
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_progress_pills_kit"
    end
  end
end
