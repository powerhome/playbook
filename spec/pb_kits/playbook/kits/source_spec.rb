# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_source/source"

RSpec.describe Playbook::PbSource::Source do
  subject { Playbook::PbSource::Source }

  it { is_expected.to define_boolean_prop(:hide_icon)
                      .with_default(false) }
  it { is_expected.to define_prop(:source).of_type(Playbook::Props::String) }
  it { is_expected.to define_enum_prop(:type)
                      .with_values("user", "retail", "inbound", "outbound", "prospecting", "events", "referral")
                      .with_default("inbound") }
  it { is_expected.to define_prop(:user).of_type(Playbook::Props::Hash)
                      .with_default({}) }

  describe "#type_text" do
    it "titlizes the type when no user is present" do
      expect(subject.new(type: "prospecting").type_text).to eq "Prospecting"
    end

    it "returns the user's name when a user is present" do
      expect(subject.new(type: "user", user: {name: "New User"}).type_text).to eq "New User"
    end
  end

  describe "#show_icon?" do
    it "returns true when passed a type that uses an icon and no user is present" do
      expect(subject.new(type: "prospecting").show_icon?).to eq true
    end

    it "returns false when passed a type that uses an avatar (either 'referral' or 'user') and a user" do
      expect(subject.new(type: "referral", user: {name: "user"}).show_icon?).to eq false
    end
  end

  describe "#avatar" do
    it "returns nil when passed a type that uses an icon, and not passed a user" do
      expect(subject.new(type: "referral").avatar).to eq nil
    end

    it "removes the user's id from the hash if one is passed"do
      expect(subject.new(type: "user", user: { name: "First User", user_id: 33 }).avatar).to_not include(:user_id => 33)
    end

    it "updates avatar props hash with size: sm" do
      expect(subject.new(type: "referral", user: { name: "user" }).avatar).to include(:size => "sm")
    end
  end

  describe "#type_icon_name" do
    it "returns correct icon", :aggregate_failures do
      expect(subject.new(type: "retail").type_icon_name).to eq "shopping-bag"
      expect(subject.new(type: "inbound").type_icon_name).to eq "sign-in"
      expect(subject.new(type: "outbound").type_icon_name).to eq "sign-out"
      expect(subject.new(type: "prospecting").type_icon_name).to eq "binoculars"
      expect(subject.new(type: "events").type_icon_name).to eq "calendar-alt"
      expect(subject.new(type: "referral").type_icon_name).to eq "handshake"
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_source_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_source_kit additional_class"
    end
  end
end
