# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_pill/pill"

RSpec.describe Playbook::PbPill::Pill do
  subject { Playbook::PbPill::Pill }

  it { is_expected.to define_prop(:text) }
  it {
    is_expected.to define_enum_prop(:size)
      .with_default(nil)
      .with_values("sm", nil)
  }
  it {
    is_expected.to define_enum_prop(:variant)
      .with_default("neutral")
      .with_values("neutral", "success", "warning", "error", "info", "primary")
  }
  it { is_expected.to define_boolean_prop(:notification).with_default(false) }
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_pill_kit_neutral_lowercase"
      expect(subject.new(dark: true).classname).to eq "pb_pill_kit_neutral_lowercase dark"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_pill_kit_neutral_lowercase additional_class"
      expect(subject.new(size: "sm").classname).to eq "pb_pill_kit_neutral_lowercase_sm"
      expect(subject.new(size: "sm", variant: "success", text_transform: "none").classname).to eq "pb_pill_kit_success_none_sm"
      expect(subject.new(notification: true).classname).to eq "pb_pill_kit_primary_lowercase_notification"
      expect(subject.new(notification: true, variant: "success").classname).to eq "pb_pill_kit_primary_lowercase_notification"
      expect(subject.new(notification: true, variant: "error").classname).to eq "pb_pill_kit_error_lowercase_notification"
      expect(subject.new(notification: true, size: "sm").classname).to eq "pb_pill_kit_primary_lowercase_notification_sm"
      expect(subject.new(notification: true, size: "sm", text_transform: "none", variant: "error").classname).to eq "pb_pill_kit_error_none_notification_sm"
    end
  end

  describe "rendered content" do
    let(:controller) { Class.new(ApplicationController) { helper Playbook::PbKitHelper } }

    def render_pill(template)
      controller.render(inline: template)
    end

    it "renders children when text is omitted" do
      html = render_pill('<%= pb_rails("pill") do %><span>child content</span><% end %>')

      expect(html).to include "<span>child content</span>"
      expect(html).not_to include "pb_pill_text"
    end

    it "renders text instead of children when both are passed" do
      html = render_pill('<%= pb_rails("pill", props: { text: "label" }) do %><span>child content</span><% end %>')

      expect(html).to include "label"
      expect(html).not_to include "child content"
    end
  end
end
