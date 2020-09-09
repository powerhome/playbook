# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_list_radios/list_radios"

RSpec.describe Playbook::PbListRadios::ListRadios do
  subject { Playbook::PbListRadios::ListRadios }

  it { is_expected.to define_partial }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_list_radios_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_list_radios_kit additional_class"
    end
  end
end
