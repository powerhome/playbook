# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_distribution_bar/distribution_bar"

RSpec.describe Playbook::PbDistributionBar::DistributionBar do
  subject { Playbook::PbDistributionBar::DistributionBar }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:size)
                      .with_default("lg")
                      .with_values("lg", "sm") }
  it { is_expected.to define_prop(:widths)
                      .of_type(Playbook::Props::NumberArray)
                      .with_default([1]) }

   describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_distribution_bar_lg"
      expect(subject.new(size: "sm").classname).to eq "pb_distribution_bar_sm"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_distribution_bar_lg additional_class"
    end
  end

end
