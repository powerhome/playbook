# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table_colgroup"

RSpec.describe Playbook::PbTable::TableColgroup do
  subject { Playbook::PbTable::TableColgroup }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_table_colgroup_kit"
      expect(subject.new(dark: true, align: "end").classname).to eq "pb_table_colgroup_kit dark"
    end
  end
end
