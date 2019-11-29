# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_textarea/textarea"

RSpec.describe Playbook::PbTextarea::Textarea do
  subject { Playbook::PbTextarea::Textarea }

  it { is_expected.to define_partial }

  it { is_expected.to define_string_prop(:label)
  it { is_expected.to define_string_prop(:placeholder)
  it { is_expected.to define_string_prop(:value)
  it { is_expected.to define_boolean_prop(:dark)
                      .with_default(false) }
  it { is_expected.to define_prop(:rows)
                      .of_type(Playbook::Props::Number)
                      .with_default(4) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_textarea_kit"
      expect(subject.new({dark:true}).classname).to eq "pb_textarea_kit_dark"
    end
  end
end
