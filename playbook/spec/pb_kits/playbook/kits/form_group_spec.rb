# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_form_group/form_group"

RSpec.describe Playbook::PbFormGroup::FormGroup do
  subject { Playbook::PbFormGroup::FormGroup }

  it { is_expected.to define_boolean_prop(:full_width).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name" do
      expect(subject.new({}).classname).to eq "pb_form_group_kit"
      expect(subject.new(full_width: true).classname).to eq "pb_form_group_kit_full"
    end
  end
end
