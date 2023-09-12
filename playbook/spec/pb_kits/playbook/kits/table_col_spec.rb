# frozen_string_literal: true

RSpec.describe Playbook::PbTable::TableCol do
  subject { Playbook::PbTable::TableCol }

  it {
    is_expected.to define_prop(:span)
      .of_type(Playbook::Props::Number)
  }

  it {
    is_expected.to define_prop(:background_color)
      .of_type(Playbook::Props::String)
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_table_col_kit"
      expect(subject.new({ background_color: "info_subtle" }).classname).to eq "pb_background_kit pb_background_color_info_subtle pb_table_col_kit"
      expect(subject.new(dark: true).classname).to eq "pb_table_col_kit dark"
    end
  end
end
