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

    context "when managing enabled/disabled states" do
      it "correctly toggles between enabled and disabled classes", :aggregate_failures do
        enabled_button = subject.new(disabled: false)
        disabled_button = subject.new(disabled: true)

        expect(enabled_button.classname).to include("pb_button_enabled")
        expect(enabled_button.classname).to_not include("pb_button_disabled")

        expect(disabled_button.classname).to include("pb_button_disabled")
        expect(disabled_button.classname).to_not include("pb_button_enabled")
      end

      it "applies disabled state correctly for different variants", :aggregate_failures do
        %w[primary secondary link danger reaction].each do |variant|
          enabled_button = subject.new(variant: variant, disabled: false)
          disabled_button = subject.new(variant: variant, disabled: true)

          expect(enabled_button.classname).to include("pb_button_enabled")
          expect(disabled_button.classname).to include("pb_button_disabled")
        end
      end

      it "maintains disabled state with other modifiers", :aggregate_failures do
        button_props = {
          disabled: true,
          full_width: true,
          size: "lg",
          variant: "secondary",
        }
        button = subject.new(button_props)

        expect(button.classname).to include("pb_button_disabled")
        expect(button.classname).to include("pb_button_block")
        expect(button.classname).to include("pb_button_size_lg")
        expect(button.classname).to include("pb_button_secondary")
      end
    end
  end

  describe "#options for managed buttons" do
    context "when button supports JavaScript management" do
      it "properly handles disabled attribute for button tags", :aggregate_failures do
        disabled_button = subject.new(disabled: true)
        enabled_button = subject.new(disabled: false)

        expect(disabled_button.options).to include(disabled: true)
        expect(enabled_button.options).to_not include(disabled: true)
      end

      it "supports data attributes for managed functionality" do
        button_with_data = subject.new({})
        expect { button_with_data.options }.to_not raise_error
      end
    end
  end

  describe "disabled state behavior for different tag types" do
    context "when using button tag" do
      it "uses disabled attribute for button elements", :aggregate_failures do
        button = subject.new(disabled: true, link: nil)

        expect(button.tag).to eq "button"
        expect(button.options).to include(disabled: true)
      end
    end

    context "when using a tag" do
      it "prevents link functionality when disabled", :aggregate_failures do
        disabled_link_button = subject.new(disabled: true, link: "http://example.com")
        enabled_link_button = subject.new(disabled: false, link: "http://example.com")

        expect(disabled_link_button.tag).to eq "button"
        expect(enabled_link_button.tag).to eq "a"
      end
    end
  end
end
