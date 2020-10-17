# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_form_pill/form_pill"

RSpec.describe Playbook::PbFormPill::FormPill do
  subject { Playbook::PbFormPill::FormPill }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:avatar_url) }


  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_form_pill_kit_primary"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_form_pill_kit_primary additional_class"
    end
  end



  # Do not leave this file blank. Use other spec files for example tests.
end
