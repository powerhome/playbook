# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table_colgroup"

RSpec.describe Playbook::PbTable::TableCol do
  subject { Playbook::PbTable::TableCol }

  it {
    is_expected.to define_prop(:span)
      .of_type(Playbook::Props::Number)
  }

  it {
    is_expected.to define_enum_prop(:background_color)
      .with_default("card_light")
  }

  describe "#background_color" do
    it "should have certain color tokens", :aggregate_failures do
      kit_background_colors = subject.new({}).props[:background_color].values
      background_colors = YAML.load_file(Playbook::Engine.root.join("colors.yml"))["background_colors"].map(&:to_s)
      expect(kit_background_colors.sort).to eq background_colors.sort
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to start_with "pb_table_col_kit"
      expect(subject.new(dark: true, align: "end").classname).to eq "pb_table_col_kit_background_color_card_light dark"
    end
  end
end
