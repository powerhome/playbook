# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_person/person"

RSpec.describe Playbook::PbPerson::Person do
  subject { Playbook::PbPerson::Person }

  it { is_expected.to define_partial }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_person_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_person_kit additional_class"
    end
  end
end
