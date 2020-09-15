# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_collapsible/collapsible_main"

RSpec.describe Playbook::PbCollapsible::CollapsibleMain do
  subject { Playbook::PbCollapsible::CollapsibleMain }

  it { is_expected.to define_partial }

  describe "#classname" do
    it "returns namespaced class name",
    :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_collapsible_main_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_collapsible_main_kit additional_class"
    end
  end

  describe "#data" do
    it "returns expected data attributes",
    :aggregate_failures do
      expect(subject.new({}).data).to eq ({collapsible_main: true})
      expect(subject.new(data:{foo: "bar"}).data).to eq ({collapsible_main: true, foo: "bar"})
    end
  end
end
