# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_button/button"

RSpec.describe Playbook::PbButton::Button do
  subject { Playbook::PbButton::Button }

  it {
    is_expected.to define_enum_prop(:variant)
      .with_default("primary")
      .with_values("primary", "secondary", "link", "danger", "reaction")
  }
  it {
    is_expected.to define_enum_prop(:size)
      .with_default(nil)
      .with_values("sm", "md", "lg", nil)
  }
  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
  it { is_expected.to define_boolean_prop(:full_width).with_default(false) }
  it { is_expected.to define_boolean_prop(:loading).with_default(false) }
  it { is_expected.to define_boolean_prop(:new_window).with_default(false) }
  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_prop(:link) }
  it { is_expected.to define_prop(:type) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:form).with_default(nil) }

  describe "#tag" do
    it "returns 'button' when link is not provided" do
      expect(subject.new({}).tag).to eq "button"
    end
    it "returns 'a' when link is provided" do
      expect(subject.new(link: true).tag).to eq "a"
    end
    it "returns 'button' when link and disabled" do
      expect(subject.new(link: true, disabled: true).tag).to eq "button"
    end
  end

  describe "#link_options" do
    it "returns all the correct link options", :aggregate_failures do
      expect(subject.new(new_window: true).link_options).to include target: "_blank"
      expect(subject.new(new_window: false).link_options).to_not include(:target)

      expect(subject.new(link: "Google.com").link_options).to include href: "Google.com"
    end
  end

  describe "#options" do
    context "returns all the correct options" do
      it "disabled", :aggregate_failures do
        expect(subject.new(disabled: true).options).to include disabled: true
        expect(subject.new.options).to_not include disabled: true
      end

      it "type", :aggregate_failures do
        expect(subject.new(type: "button").options).to include(:type)
        expect(subject.new.options).to_not include(:type)
      end

      it "value", :aggregate_failures do
        expect(subject.new(value: "123").options).to include(:value)
        expect(subject.new.options).to_not include(:value)
      end

      it "form", :aggregate_failures do
        expect(subject.new(form: "form-id").options).to include(:form)
        expect(subject.new.options).to_not include(:form)
      end
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_button_kit pb_button_primary pb_button_inline pb_button_enabled"
      expect(subject.new(variant: "secondary").classname).to eq "pb_button_kit pb_button_secondary pb_button_inline pb_button_enabled"
      expect(subject.new(disabled: true).classname).to eq "pb_button_kit pb_button_primary pb_button_inline pb_button_disabled"
      expect(subject.new(full_width: true).classname).to eq "pb_button_kit pb_button_primary pb_button_block pb_button_enabled"
      expect(subject.new(size: "sm").classname).to eq "pb_button_kit pb_button_primary pb_button_inline pb_button_enabled pb_button_size_sm"
      expect(subject.new(size: "lg").classname).to eq "pb_button_kit pb_button_primary pb_button_inline pb_button_enabled pb_button_size_lg"
    end
  end
end
