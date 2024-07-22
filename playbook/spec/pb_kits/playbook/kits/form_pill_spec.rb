# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_form_pill/form_pill"

RSpec.describe Playbook::PbFormPill::FormPill do
  subject { Playbook::PbFormPill::FormPill }

  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:avatar_url) }
  it { is_expected.to define_prop(:size) }
  it { is_expected.to define_prop(:color) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_form_pill_kit_primary_none"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_form_pill_kit_primary_none additional_class"
      expect(subject.new(color: "neutral").classname).to eq "pb_form_pill_kit_neutral_none"
    end
  end
end
