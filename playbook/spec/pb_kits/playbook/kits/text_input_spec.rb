# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_text_input/add_on"
require_relative "../../../../app/pb_kits/playbook/pb_text_input/text_input"

RSpec.describe Playbook::PbTextInput::TextInput do
  subject { Playbook::PbTextInput::TextInput }

  it { is_expected.to define_prop(:autocomplete) }
  it { is_expected.to define_prop(:disabled) }
  it { is_expected.to define_prop(:dark).with_default(false) }
  it { is_expected.to define_prop(:error) }
  it { is_expected.to define_prop(:inline).with_default(false) }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:placeholder) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:type).with_default("text") }
  it { is_expected.to define_hash_prop(:input_options).with_default({}) }
  it { is_expected.to define_prop(:mask).with_default(nil) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_text_input_kit mb_sm"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_text_input_kit additional_class mb_sm"
      expect(subject.new({ dark: true }).classname).to eq "pb_text_input_kit dark mb_sm"
      expect(subject.new({ inline: true }).classname).to eq "pb_text_input_kit mb_sm inline"
      expect(subject.new({ error: "Please enter a valid email" }).classname).to eq "pb_text_input_kit mb_sm error"
      expect(subject.new({ dark: true, error: "Please enter a valid email" }).classname).to eq "pb_text_input_kit dark mb_sm error"
      expect(subject.new({ margin_bottom: "lg" }).classname).to eq "pb_text_input_kit mb_lg"
    end
  end

  describe "#mask" do
    context "with a valid mask" do
      it "sets data-pb-input-mask attribute and mask prop" do
        text_input = subject.new(mask: "currency")
        expect(text_input.input_tag).to include('data-pb-input-mask="true"')
        expect(text_input.input_tag).to include('mask="currency"')
      end

      it "sets the correct pattern for currency" do
        text_input = subject.new(mask: "currency")
        expect(text_input.input_tag).to include('pattern="^\\$\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?$"')
      end
    end

    context "without a mask" do
      it "does not set data-pb-input-mask" do
        text_input = subject.new(mask: nil)
        expect(text_input.input_tag).not_to include("data-pb-input-mask")
      end
    end
  end

  describe "#autocomplete" do
    context "when autocomplete is false" do
      it "renders input with autocomplete='off'" do
        text_input = subject.new(autocomplete: false)
        expect(text_input.input_tag).to include('autocomplete="off"')
      end
    end

    context "when autocomplete is a string" do
      it "renders input with autocomplete set to that string" do
        text_input = subject.new(autocomplete: "email")
        expect(text_input.input_tag).to include('autocomplete="email"')
      end
    end

    context "when autocomplete is true" do
      it "does not render an autocomplete attribute" do
        text_input = subject.new(autocomplete: true)
        expect(text_input.input_tag).not_to include("autocomplete=")
      end
    end

    context "when autocomplete is not provided" do
      it "does not render an autocomplete attribute" do
        text_input = subject.new({})
        expect(text_input.input_tag).not_to include("autocomplete=")
      end
    end
  end
end
