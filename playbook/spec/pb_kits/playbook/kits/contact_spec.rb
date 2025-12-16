# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_contact/contact"

RSpec.describe Playbook::PbContact::Contact do
  subject { Playbook::PbContact::Contact }

  it { is_expected.to define_prop(:contact_type) }
  it { is_expected.to define_prop(:contact_value) }
  it { is_expected.to define_prop(:contact_detail) }
  it { is_expected.to define_prop(:icon_enabled) }
  it { is_expected.to define_prop(:unstyled) }

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

  describe "#formatted_contact_value" do
    it "formats US phone numbers with +1 prefix for 11-digit numbers", :aggregate_failures do
      expect(subject.new(contact_type: "home", contact_value: "12125551234").formatted_contact_value).to eq "+1 (212) 555-1234"
      expect(subject.new(contact_type: "work", contact_value: "14155551234").formatted_contact_value).to eq "+1 (415) 555-1234"
      expect(subject.new(contact_type: "cell", contact_value: "2125551234").formatted_contact_value).to eq "(212) 555-1234"
    end

    it "handles extensions", :aggregate_failures do
      expect(subject.new(contact_type: "extension", contact_value: "1234").formatted_contact_value).to eq "1234"
    end

    it "preserves international numbers", :aggregate_failures do
      expect(subject.new(contact_type: "international", contact_value: "+44 20 7946 0958").formatted_contact_value).to eq "+44 20 7946 0958"
    end

    it "preserves email addresses", :aggregate_failures do
      expect(subject.new(contact_type: "email", contact_value: "test@example.com").formatted_contact_value).to eq "test@example.com"
    end
  end

  describe "icon_enabled prop" do
    it "defaults to true" do
      expect(subject.new({}).icon_enabled).to be true
    end

    it "can be set to false" do
      expect(subject.new(icon_enabled: false).icon_enabled).to be false
    end
  end

  describe "unstyled prop" do
    it "defaults to false" do
      expect(subject.new({}).unstyled).to be false
    end

    it "can be set to true" do
      expect(subject.new(unstyled: true).unstyled).to be true
    end
  end
end
