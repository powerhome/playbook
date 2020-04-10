# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_logistic/logistic"

RSpec.describe Playbook::PbLogistic::Logistic do
  subject { Playbook::PbLogistic::Logistic }

  it { is_expected.to define_partial }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_prop(:project_name) }
  it { is_expected.to define_prop(:project_number) }
  it { is_expected.to define_prop(:date) }
  it { is_expected.to define_prop(:link) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_logistic_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_logistic_kit additional_class"
    end
  end
end
