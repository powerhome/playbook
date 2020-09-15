# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_collapsible/collapsible"

RSpec.describe Playbook::PbCollapsible::Collapsible do
  subject { Playbook::PbCollapsible::Collapsible }

  it { is_expected.to define_partial }

  describe "#classname" do
    it "returns namespaced class name",
    :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_collapsible_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_collapsible_kit additional_class"
    end
  end
end
