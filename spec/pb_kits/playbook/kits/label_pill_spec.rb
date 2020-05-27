# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_label_pill/label_pill"

RSpec.describe Playbook::PbLabelPill::LabelPill do
  subject { Playbook::PbLabelPill::LabelPill }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:pill_value) }
  it { is_expected.to define_enum_prop(:variant)
                      .with_default("neutral")
                      .with_values("neutral", "success", "warning", "error", "info", "primary") }
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_label_pill_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_label_pill_kit additional_class"
    end
  end
end
