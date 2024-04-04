# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table_head"

RSpec.describe Playbook::PbTable::TableHead do
  subject { Playbook::PbTable::TableHead }

  it { is_expected.to define_enum_prop(:tag).with_default("table").with_values("div", "table") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_table_thead"
    end
  end
end
