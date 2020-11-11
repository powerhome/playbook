# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table_row"

RSpec.describe Playbook::PbTable::TableRow do
  subject { Playbook::PbTable::TableRow }

  it { is_expected.to define_partial }

  it { is_expected.to define_string_prop(:side_highlight_color) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_table_row_kit_side_highlight_none"
      expect(subject.new({side_highlight_color: "windows"}).classname).to eq "pb_table_row_kit_side_highlight_windows"
      expect(subject.new({side_highlight_color: "siding"}).classname).to eq "pb_table_row_kit_side_highlight_siding"
      expect(subject.new({side_highlight_color: "roofs"}).classname).to eq "pb_table_row_kit_side_highlight_roofs"
      expect(subject.new({side_highlight_color: "success"}).classname).to eq "pb_table_row_kit_side_highlight_success"
      expect(subject.new({side_highlight_color: "warning"}).classname).to eq "pb_table_row_kit_side_highlight_warning"
      expect(subject.new({side_highlight_color: "error"}).classname).to eq "pb_table_row_kit_side_highlight_error"
      expect(subject.new({side_highlight_color: "category_1"}).classname).to eq "pb_table_row_kit_side_highlight_category_1"
      expect(subject.new({side_highlight_color: "category_2"}).classname).to eq "pb_table_row_kit_side_highlight_category_2"
      expect(subject.new({side_highlight_color: "category_3"}).classname).to eq "pb_table_row_kit_side_highlight_category_3"
    end
  end
end