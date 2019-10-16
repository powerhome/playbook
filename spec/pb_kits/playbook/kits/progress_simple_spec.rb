# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_progress_simple/progress_simple"

RSpec.describe Playbook::PbProgressSimple::ProgressSimple do
  subject { Playbook::PbProgressSimple::ProgressSimple }

  it { is_expected.to define_partial }
  it { is_expected.to define_enum_prop(:align)
    .with_values("left", "center", "right")
    .with_default("left") }
  it { is_expected.to define_prop(:value).of_type(Playbook::Props::Number) }
  it { is_expected.to define_prop(:max).of_type(Playbook::Props::Number) }
  it { is_expected.to define_boolean_prop(:muted)
    .with_default(false) }
  it { is_expected.to define_prop(:percent).of_type(Playbook::Props::Percentage) }
  it { is_expected.to define_prop(:width) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_progress_simple_kit_left"
      expect(subject.new(align: "center").classname).to eq "pb_progress_simple_kit_center"
      expect(subject.new(muted: true).classname).to eq "pb_progress_simple_kit_muted_left"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_progress_simple_kit_left additional_class"
    end
  end
end
