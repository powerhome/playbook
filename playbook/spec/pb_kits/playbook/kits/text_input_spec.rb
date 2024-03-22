# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_text_input/add_on"
require_relative "../../../../app/pb_kits/playbook/pb_text_input/text_input"

RSpec.describe Playbook::PbTextInput::TextInput do
  subject { Playbook::PbTextInput::TextInput }

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
end
