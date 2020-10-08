# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_textarea/textarea"

RSpec.describe Playbook::PbTextarea::Textarea do
  subject { Playbook::PbTextarea::Textarea }

  it { is_expected.to define_partial }

  it { is_expected.to define_boolean_prop(:error) }
  it { is_expected.to define_string_prop(:error_message) }
  it { is_expected.to define_string_prop(:label) }
  it { is_expected.to define_string_prop(:value) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_hash_prop(:input_options).with_default({}) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_textarea_kit resize_none"
      expect(subject.new({dark: true}).classname).to eq "pb_textarea_kit resize_none dark"
      expect(subject.new({error: true}).classname).to eq "pb_textarea_kit error resize_none"
      expect(subject.new({dark: true, error: true}).classname).to eq "pb_textarea_kit error resize_none dark"
    end
  end

end
