# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_form_group/form_group"

RSpec.describe Playbook::PbFormGroup::FormGroup do
  subject { Playbook::PbFormGroup::FormGroup }

  describe "#classname" do
    it "returns namespaced class name" do
      expect(subject.new({}).classname).to eq "pb_form_group_kit"
    end
  end
end
