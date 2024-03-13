# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table_row"

RSpec.describe Playbook::PbTable::TableRow do
  subject { Playbook::PbTable::TableRow }

  it { is_expected.to define_string_prop(:side_highlight_color) }
  it { is_expected.to define_enum_prop(:tag).with_default("table").with_values("div", "table") }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_table_row_kit_side_highlight_none"
      expect(subject.new({ side_highlight_color: "windows" }).classname).to eq "pb_table_row_kit_side_highlight_windows pb_table_tr"
      expect(subject.new({ side_highlight_color: "siding" }).classname).to eq "pb_table_row_kit_side_highlight_siding pb_table_tr"
      expect(subject.new({ side_highlight_color: "roofs" }).classname).to eq "pb_table_row_kit_side_highlight_roofs pb_table_tr"
      expect(subject.new({ side_highlight_color: "success" }).classname).to eq "pb_table_row_kit_side_highlight_success pb_table_tr"
      expect(subject.new({ side_highlight_color: "warning" }).classname).to eq "pb_table_row_kit_side_highlight_warning pb_table_tr"
      expect(subject.new({ side_highlight_color: "error" }).classname).to eq "pb_table_row_kit_side_highlight_error pb_table_tr"
      expect(subject.new({ side_highlight_color: "category_1" }).classname).to eq "pb_table_row_kit_side_highlight_category_1 pb_table_tr"
      expect(subject.new({ side_highlight_color: "category_2" }).classname).to eq "pb_table_row_kit_side_highlight_category_2 pb_table_tr"
      expect(subject.new({ side_highlight_color: "category_3" }).classname).to eq "pb_table_row_kit_side_highlight_category_3 pb_table_tr"
    end
  end
end
