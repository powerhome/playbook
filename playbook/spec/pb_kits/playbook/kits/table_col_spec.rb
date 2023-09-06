# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table_colgroup"

RSpec.describe Playbook::PbTable::TableCol do
  subject { Playbook::PbTable::TableCol }

  it {
    is_expected.to define_prop(:span)
      .of_type(Playbook::Props::Number)
  }
  # it {
  #   is_expected.to define_enum_prop(:background_color)
  #     .with_default("light")
  #     .with_values("import colors from yml file")
  # }
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_table_col_kit"
      expect(subject.new(dark: true, align: "end").classname).to eq "pb_table_col_kit_background_color_card_light dark"
    end
  end
end
