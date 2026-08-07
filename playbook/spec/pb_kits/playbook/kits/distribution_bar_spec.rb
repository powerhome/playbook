# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_distribution_bar/distribution_bar"

RSpec.describe Playbook::PbDistributionBar::DistributionBar do
  subject { Playbook::PbDistributionBar::DistributionBar }

  it {
    is_expected.to define_enum_prop(:size)
      .with_default("lg")
      .with_values("lg", "sm")
  }
  it {
    is_expected.to define_prop(:widths)
      .of_type(Playbook::Props::NumberArray)
      .with_default([1])
  }
  it {
    is_expected.to define_prop(:colors)
      .of_type(Playbook::Props::Array)
      .with_default([])
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_distribution_bar_lg"
      expect(subject.new(size: "sm").classname).to eq "pb_distribution_bar_sm"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_distribution_bar_lg additional_class"
    end
  end

  describe "#widths_to_percentages" do
    it "converts widths to percentage shares of the total", :aggregate_failures do
      expect(subject.new(widths: [1]).widths_to_percentages).to eq [100.0]
      expect(subject.new(widths: [1, 1]).widths_to_percentages).to eq [50.0, 50.0]
      expect(subject.new(widths: [1, 2, 1]).widths_to_percentages).to eq [25.0, 50.0, 25.0]
      expect(subject.new(widths: [1, 2, 3, 4]).widths_to_percentages).to eq [10.0, 20.0, 30.0, 40.0]
    end
  end

  describe "#segment_classname" do
    it "returns the base segment class without a color override" do
      expect(subject.new.segment_classname(0)).to eq "pb_distribution_width"
    end

    it "appends a color class when a matching color is provided" do
      bar = subject.new(colors: %w[data_7 data_1 neutral])

      expect(bar.segment_classname(0)).to eq "pb_distribution_width color_data_7"
      expect(bar.segment_classname(1)).to eq "pb_distribution_width color_data_1"
      expect(bar.segment_classname(2)).to eq "pb_distribution_width color_neutral"
    end

    it "omits the color class when no color is set for that index" do
      bar = subject.new(colors: ["data_7"])

      expect(bar.segment_classname(1)).to eq "pb_distribution_width"
    end
  end
end
