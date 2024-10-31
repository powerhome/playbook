# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_link/link"

RSpec.describe Playbook::PbLink::Link do
  subject { Playbook::PbLink::Link }

  it {
    is_expected.to define_enum_prop(:color)
      .with_default("default")
      .with_values("default", "body", "muted", "destructive")
  }
  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
  it { is_expected.to define_prop(:href) }
  it { is_expected.to define_prop(:icon) }
  it { is_expected.to define_prop(:icon_right) }
  it {
    is_expected.to define_enum_prop(:tag)
      .with_default("a")
      .with_values("a", "h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div")
  }
  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_boolean_prop(:underline).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_link_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_link_kit additional_class"
      expect(subject.new(dark: true).classname).to eq "pb_link_kit dark"
      expect(subject.new(color: "destructive").classname).to eq "pb_link_kit_destructive"
      expect(subject.new(underline: true).classname).to eq "pb_link_kit_underline"
      expect(subject.new(disabled: true).classname).to eq "pb_link_kit_disabled"
    end
  end

  describe "#href" do
    it "adds href attribute", :aggregate_failures do
      instance = subject.new(href: "google.com")
      expect(instance.href).to eq("google.com")
      expect(instance).to have_attributes(href: "google.com")
    end
  end
end
