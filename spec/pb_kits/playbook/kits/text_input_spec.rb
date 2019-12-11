# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_text_input/text_input"

RSpec.describe Playbook::PbTextInput::TextInput do
  subject { Playbook::PbTextInput::TextInput }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:dark).with_default(false) }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:placeholder) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:type).with_default("text") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_text_input_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_text_input_kit additional_class"
      expect(subject.new({dark:true}).classname).to eq "pb_text_input_kit_dark"
    end
  end
end
