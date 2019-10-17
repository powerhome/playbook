# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_person_contact/person_contact"

RSpec.describe Playbook::PbPersonContact::PersonContact do
  subject { Playbook::PbPersonContact::PersonContact }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:people)
                      .of_type(Playbook::Props::HashArray)
                      .with_default([]) }
  it { is_expected.to define_prop(:contacts)
                      .of_type(Playbook::Props::HashArray)
                      .with_default([]) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_person_contact_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_person_contact_kit additional_class"
    end
  end
end
