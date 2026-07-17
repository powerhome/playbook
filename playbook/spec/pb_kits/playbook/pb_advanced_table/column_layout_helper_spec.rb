# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_advanced_table/column_layout_helper"

RSpec.describe Playbook::PbAdvancedTable::ColumnLayoutHelper do
  subject { described_class }

  describe ".css_length" do
    it "converts numbers to px", :aggregate_failures do
      expect(subject.css_length(128)).to eq "128px"
      expect(subject.css_length(12.5)).to eq "12.5px"
    end

    it "passes CSS length strings through" do
      expect(subject.css_length("12rem")).to eq "12rem"
    end

    it "returns nil for blank values", :aggregate_failures do
      expect(subject.css_length(nil)).to be_nil
      expect(subject.css_length("")).to be_nil
    end
  end

  describe ".build_column_layout_styles" do
    it "returns an empty hash when styling is blank", :aggregate_failures do
      expect(subject.build_column_layout_styles(nil)).to eq({})
      expect(subject.build_column_layout_styles({})).to eq({})
    end

    it "locks min and max when only width is provided" do
      expect(subject.build_column_layout_styles({ width: 128 })).to eq(
        width: "128px",
        min_width: "128px",
        max_width: "128px"
      )
    end

    it "applies min_width alone as a floor" do
      expect(subject.build_column_layout_styles({ min_width: 160 })).to eq(
        min_width: "160px"
      )
    end

    it "applies a min / preferred / max band" do
      expect(subject.build_column_layout_styles({ min_width: 108, width: 124, max_width: 168 })).to eq(
        width: "124px",
        min_width: "108px",
        max_width: "168px"
      )
    end

    it "accepts camelCase aliases" do
      expect(subject.build_column_layout_styles({ minWidth: 108, width: "12rem", maxWidth: 168 })).to eq(
        width: "12rem",
        min_width: "108px",
        max_width: "168px"
      )
    end
  end
end
