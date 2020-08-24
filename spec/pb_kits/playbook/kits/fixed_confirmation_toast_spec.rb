# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_fixed_confirmation_toast/fixed_confirmation_toast"

RSpec.describe Playbook::PbFixedConfirmationToast::FixedConfirmationToast do
  subject { Playbook::PbFixedConfirmationToast::FixedConfirmationToast }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:text).of_type(Playbook::Props::String) }
  it { is_expected.to define_enum_prop(:status)
                      .with_default("neutral")
                      .with_values("success", "error", "neutral", "tip") }

  describe "#show_text?" do
    it "returns true if text is present", :aggregate_failures do
      expect(subject.new({}).show_text?).to eq false
      expect(subject.new(text: "").show_text?).to eq false
      expect(subject.new(text: "Show me!").show_text?).to eq true
    end
  end

  describe "#icon_value" do
    it "returns correct icon name", :aggregate_failures do
      expect(subject.new(status: "success").icon_value).to eq "check"
      expect(subject.new(status: "error").icon_value).to eq "exclamation-triangle"
      expect(subject.new(status: "neutral").icon_value).to eq "info-circle"
      expect(subject.new(status: "tip").icon_value).to eq "info-circle"
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      text = "Test text"
      expect(subject.new(text: text).classname).to eq "pb_fixed_confirmation_toast_kit_neutral"
      expect(subject.new(text: text, status: "success").classname).to eq "pb_fixed_confirmation_toast_kit_success"
      expect(subject.new(text: text, status: "error").classname).to eq "pb_fixed_confirmation_toast_kit_error"
      expect(subject.new(text: text, status: "neutral").classname).to eq "pb_fixed_confirmation_toast_kit_neutral"
      expect(subject.new(text: text, status: "tip").classname).to eq "pb_fixed_confirmation_toast_kit_tip"
      expect(subject.new(text: text, status: "tip", dark: true).classname).to eq "pb_fixed_confirmation_toast_kit_tip dark"
    end
  end
end


