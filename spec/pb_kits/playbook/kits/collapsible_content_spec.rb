# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_collapsible/collapsible_content"

RSpec.describe Playbook::PbCollapsible::CollapsibleContent do
  subject { Playbook::PbCollapsible::CollapsibleContent }

  it { is_expected.to define_partial }

  describe "#classname" do
    it "returns namespaced class name",
    :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_collapsible_content_kit toggle-content"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_collapsible_content_kit toggle-content additional_class"
    end
  end

  describe "#data" do
    it "returns expected data attributes",
    :aggregate_failures do
      expect(subject.new({}).data).to eq ({collapsible_content: true})
      expect(subject.new(data:{foo: "bar"}).data).to eq ({collapsible_content: true, foo: "bar"})
    end
  end
end
