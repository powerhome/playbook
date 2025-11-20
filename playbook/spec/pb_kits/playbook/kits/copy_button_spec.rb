# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_copy_button/copy_button"

RSpec.describe Playbook::PbCopyButton::CopyButton do
  subject { Playbook::PbCopyButton::CopyButton }

  it { is_expected.to define_prop(:text) }

  it {
    is_expected.to define_enum_prop(:tooltip_position)
      .with_default("top")
      .with_values("top", "right", "bottom", "left")
  }

  it {
    is_expected.to define_prop(:tooltip_text)
      .with_default("Copied!")
  }

  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:from) }

  it {
    is_expected.to define_enum_prop(:variant)
      .with_default("icon")
      .with_values("button", "icon")
  }

  describe "#classname" do
    it "returns the correct base class" do
      expect(subject.new.classname).to eq "pb_copy_button_kit"
      expect(
        subject.new(classname: "additional_class").classname
      ).to eq "pb_copy_button_kit additional_class"
    end
  end

  describe "#data" do
    it "includes copy-value from the value prop" do
      copy_button = subject.new(value: "Some text to copy")
      expect(copy_button.data[:"copy-value"]).to eq "Some text to copy"
    end

    it "includes from attribute from the from prop" do
      copy_button = subject.new(from: "copy-text-field")
      expect(copy_button.data[:from]).to eq("copy-text-field")
    end
  end
end
