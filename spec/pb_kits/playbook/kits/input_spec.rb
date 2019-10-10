# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_input/input"

RSpec.describe Playbook::PbInput::Input do
  subject { Playbook::PbInput::Input }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:placeholder) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:type).with_default("text") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_input_field_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_input_field_kit additional_class"
    end
  end
end
