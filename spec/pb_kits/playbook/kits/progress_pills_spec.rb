# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_progress_pills/progress_pills"

RSpec.describe Playbook::PbProgressPills::ProgressPills do
  subject { Playbook::PbProgressPills::ProgressPills }

  it { is_expected.to define_partial }
  it { is_expected.to define_boolean_prop(:dark)
                      .with_default(false) }
  it { is_expected.to define_prop(:steps)
                      .of_type(Playbook::Props::Number)
                      .with_default(3) }
  it { is_expected.to define_prop(:active)
                      .of_type(Playbook::Props::Number)
                      .with_default(0) }
  it { is_expected.to define_prop(:title)
                      .of_type(Playbook::Props::String)
                      .with_default(nil) }
  it { is_expected.to define_prop(:value)
                      .of_type(Playbook::Props::String)
                      .with_default(nil) }


  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_progress_pills_kit"
      expect(subject.new({dark:true}).classname).to eq "pb_progress_pills_kit_dark dark"
    end
  end



end
