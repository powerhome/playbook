# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table_body"

RSpec.describe Playbook::PbTable::TableBody do
  subject { Playbook::PbTable::TableBody }

  it { is_expected.to define_enum_prop(:tag).with_default("table").with_values("div", "table") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_table_tbody"
    end
  end
end
