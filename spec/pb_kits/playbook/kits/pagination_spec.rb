# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_pagination/pagination"

RSpec.describe Playbook::PbPagination::Pagination do
  subject { Playbook::PbPagination::Pagination }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:target_page)
                      .of_type(Playbook::Props::Number) }

  it { is_expected.to define_enum_prop(:variant)
                      .with_default("basic")
                      .with_values("basic", "collapsed", "scroll", "expanded") }

  describe ".calc_next_pages" do
    it "returns an array of three numbers incremented from the first arg passed" do
      expect(subject.new({}).calc_next_pages(5, 2)).to eq([5, 6, 7])
    end
  end

  describe ".calc_previous_pages" do
    it "returns an array of three numbers decremented from the first arg passed" do
      expect(subject.new({}).calc_previous_pages(5, 2)).to eq([3, 4, 5])
    end
  end

  describe ".total_page_count" do
    it "returns a quotient based on the args passed" do
      expect(subject.new({}).total_page_count(5, 20)).to eq(4)
    end
  end

  describe ".number_of_pages" do
    it "is not a nil value" do
      expect(subject.new({}).number_of_pages(5, 10, 100)).not_to be_nil
    end

    it "returns a type of string" do
      expect(subject.new({}).number_of_pages(5, 10, 100)).to be_instance_of String
    end

    it "returns a valid string" do
      expect(subject.new({}).number_of_pages(5, 10, 100)).to eq("5 of 10")
    end
  end
end
