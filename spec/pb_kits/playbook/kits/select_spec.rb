# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_select/select"

RSpec.describe Playbook::PbSelect::Select do
  subject { Playbook::PbSelect::Select }

  it { is_expected.to define_partial }

  it { is_expected.to define_string_prop(:blank_selection) }
  it { is_expected.to define_boolean_prop(:disabled).with_default(false) }
  it { is_expected.to define_boolean_prop(:error).with_default(false) }
  it { is_expected.to define_string_prop(:error_message) }
  it { is_expected.to define_string_prop(:include_blank) }
  it { is_expected.to define_string_prop(:label) }
  it { is_expected.to define_boolean_prop(:multiple).with_default(false) }
  it { is_expected.to define_string_prop(:name) }
  it { is_expected.to define_string_prop(:onchange) }
  it { is_expected.to define_boolean_prop(:required).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_select"
      expect(subject.new({dark: true}).classname).to eq "pb_select dark"
    end
  end
end
