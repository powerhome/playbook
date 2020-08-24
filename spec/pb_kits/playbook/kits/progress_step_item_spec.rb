# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_progress_step/progress_step_item"

RSpec.describe Playbook::PbProgressStep::ProgressStepItem do
  subject { Playbook::PbProgressStep::ProgressStepItem }

  it { is_expected.to define_partial }
  it { is_expected.to define_enum_prop(:status)
                      .with_default("inactive")
                      .with_values("complete", "active", "inactive") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_progress_step_item_inactive"
      expect(subject.new(status: 'complete').classname).to eq "pb_progress_step_item_complete"
      expect(subject.new(status: 'active').classname).to eq "pb_progress_step_item_active"
      expect(subject.new(status: 'inactive').classname).to eq "pb_progress_step_item_inactive"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_progress_step_item_inactive additional_class"
      expect(subject.new(status: 'complete', classname: "additional_class").classname).to eq "pb_progress_step_item_complete additional_class"
      expect(subject.new(status: 'active', classname: "additional_class").classname).to eq "pb_progress_step_item_active additional_class"
      expect(subject.new(status: 'inactive', classname: "additional_class").classname).to eq "pb_progress_step_item_inactive additional_class"
    end
  end
end
