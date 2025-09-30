# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_contact/contact"

RSpec.describe Playbook::PbContact::Contact do
  subject { Playbook::PbContact::Contact }

  it { is_expected.to define_prop(:contact_type) }
  it { is_expected.to define_prop(:contact_value) }
  it { is_expected.to define_prop(:contact_detail) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_contact_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_contact_kit additional_class"
    end
  end

  describe "#contact_icon" do
    it "returns correct icon", :aggregate_failures do
      expect(subject.new(contact_type: "cell").contact_icon).to eq "mobile"
      expect(subject.new(contact_type: "home").contact_icon).to eq "phone"
      expect(subject.new(contact_type: "work").contact_icon).to eq "phone-office"
      expect(subject.new(contact_type: "work-cell").contact_icon).to eq "phone-laptop"
      expect(subject.new(contact_type: "email").contact_icon).to eq "envelope"
      expect(subject.new(contact_type: "wrong-phone").contact_icon).to eq "phone-slash"
      expect(subject.new(contact_type: "intentionally-wrong-type").contact_icon).to eq "phone"
      expect(subject.new(contact_type: "extension").contact_icon).to eq "phone-plus"
      expect(subject.new(contact_type: "international").contact_icon).to eq "globe"
      expect(subject.new(contact_type: "").contact_icon).to eq "phone"
    end
  end
end
