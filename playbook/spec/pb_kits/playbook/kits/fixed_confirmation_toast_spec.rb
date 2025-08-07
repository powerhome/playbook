# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_fixed_confirmation_toast/fixed_confirmation_toast"

RSpec.describe Playbook::PbFixedConfirmationToast::FixedConfirmationToast do
  subject { Playbook::PbFixedConfirmationToast::FixedConfirmationToast }

  it { is_expected.to define_prop(:text).of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:multi_line).of_type(Playbook::Props::Boolean) }
  it {
    is_expected.to define_enum_prop(:status)
      .with_default("neutral")
      .with_values("success", "error", "neutral", "tip")
  }
  it {
    is_expected.to define_enum_prop(:horizontal)
      .with_default(nil)
      .with_values(nil, "right", "left", "center")
  }
  it {
    is_expected.to define_enum_prop(:vertical)
      .with_default(nil)
      .with_values(nil, "top", "bottom")
  }
  it { is_expected.to define_prop(:auto_close).of_type(Playbook::Props::Number) }

  describe "#show_text?" do
    it "returns true if text is present", :aggregate_failures do
      expect(subject.new({}).show_text?).to eq false
      expect(subject.new(text: "").show_text?).to eq false
      expect(subject.new(text: "Show me!").show_text?).to eq true
    end
  end

  describe "#closeable?" do
    it "returns true if closeable is present", :aggregate_failures do
      expect(subject.new({}).closeable).to eq false
      expect(subject.new(closeable: true).closeable).to eq true
    end
  end

  describe "#icon_value" do
    it "returns correct icon name", :aggregate_failures do
      expect(subject.new(status: "success").icon_value).to eq "check"
      expect(subject.new(status: "error").icon_value).to eq "exclamation-triangle"
      expect(subject.new(status: "neutral").icon_value).to eq "info-circle"
      expect(subject.new(status: "tip").icon_value).to eq "info-circle"
      expect(subject.new(status: "tip", icon: "arrow-down").icon_value).to eq "arrow-down"
    end
  end

  describe "#position_class" do
    it "returns correct position classes", :aggregate_failures do
      expect(subject.new.position_class).to eq ""
      expect(subject.new(vertical: "bottom").position_class).to eq ""
      expect(subject.new(vertical: "bottom", horizontal: "center").position_class).to eq " positioned_toast bottom center"
    end
  end

  describe "#auto_close" do
    it "returns auto close class with duration when auto_close is present" do
      expect(subject.new({}).auto_close_class).to eq ""
      expect(subject.new(auto_close: 3000).auto_close_class).to eq " auto_close_3000"
      expect(subject.new(auto_close: 10000).auto_close_class).to eq " auto_close_10000"
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
      expect(subject.new(text: text, status: "tip", closeable: true).classname).to eq "pb_fixed_confirmation_toast_kit_tip remove_toast"
      expect(subject.new(text: text, status: "error", multi_line: true).classname).to eq "pb_fixed_confirmation_toast_kit_error_multi_line"
      expect(subject.new(text: text, status: "neutral", vertical: "top").classname).to eq "pb_fixed_confirmation_toast_kit_neutral"
      expect(subject.new(text: text, status: "neutral", vertical: "top", horizontal: "center").classname).to eq "pb_fixed_confirmation_toast_kit_neutral positioned_toast top center"
      expect(subject.new(text: text, status: "tip", icon: "arrow-down").classname).to eq "pb_fixed_confirmation_toast_kit_tip custom_icon"
      expect(subject.new(text: text, icon: "none").classname).to eq "pb_fixed_confirmation_toast_kit_neutral"
      expect(subject.new(text: text, status: "tip", auto_close: 3000).classname).to eq "pb_fixed_confirmation_toast_kit_tip auto_close_3000"
    end
  end
end
