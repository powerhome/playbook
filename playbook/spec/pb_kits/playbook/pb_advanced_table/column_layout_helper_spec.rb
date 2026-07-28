# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_advanced_table/column_layout_helper"

RSpec.describe Playbook::PbAdvancedTable::ColumnLayoutHelper do
  let(:helper) do
    Class.new { include Playbook::PbAdvancedTable::ColumnLayoutHelper }.new
  end

  describe "#css_length" do
    it "converts numbers to pixel strings" do
      expect(helper.css_length(128)).to eq "128px"
      expect(helper.css_length(128.5)).to eq "128.5px"
    end

    it "passes strings through" do
      expect(helper.css_length("12rem")).to eq "12rem"
      expect(helper.css_length("200px")).to eq "200px"
    end

    it "returns nil for blank values" do
      expect(helper.css_length(nil)).to be_nil
      expect(helper.css_length("")).to be_nil
    end
  end

  describe "#build_column_layout_styles" do
    it "applies min_width, width, and max_width" do
      styles = helper.build_column_layout_styles(min_width: 108, width: 124, max_width: 168)

      expect(styles).to eq(
        width: "124px",
        min_width: "108px",
        max_width: "168px"
      )
    end

    it "locks min and max when only width is set" do
      styles = helper.build_column_layout_styles(width: 128)

      expect(styles).to eq(
        width: "128px",
        min_width: "128px",
        max_width: "128px"
      )
    end

    it "applies floor-only min_width" do
      styles = helper.build_column_layout_styles(min_width: 160)

      expect(styles).to eq(min_width: "160px")
    end

    it "accepts camelCase aliases" do
      styles = helper.build_column_layout_styles(minWidth: 108, width: 124, maxWidth: 168)

      expect(styles).to eq(
        width: "124px",
        min_width: "108px",
        max_width: "168px"
      )
    end

    it "supports CSS length strings" do
      styles = helper.build_column_layout_styles(width: "12rem", min_width: "10rem")

      expect(styles).to eq(
        width: "12rem",
        min_width: "10rem"
      )
    end

    it "returns an empty hash when styling has no width keys" do
      expect(helper.build_column_layout_styles(cell_alignment: "left")).to eq({})
      expect(helper.build_column_layout_styles({})).to eq({})
      expect(helper.build_column_layout_styles(nil)).to eq({})
    end
  end

  describe "#build_column_layout_styles_from_column" do
    it "reads from column_styling on the column definition" do
      column = {
        accessor: "year",
        column_styling: { width: 128 },
      }

      expect(helper.build_column_layout_styles_from_column(column)).to eq(
        width: "128px",
        min_width: "128px",
        max_width: "128px"
      )
    end

    it "returns empty hash when column_styling is missing" do
      expect(helper.build_column_layout_styles_from_column(accessor: "year")).to eq({})
    end
  end
end
