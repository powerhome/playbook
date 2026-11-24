# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_star_rating/star_rating"

RSpec.describe Playbook::PbStarRating::StarRating do
  subject { Playbook::PbStarRating::StarRating }

  it {
    is_expected.to define_prop(:rating)
      .of_type(Playbook::Props::Numeric)
  }

  it {
    is_expected.to define_prop(:denominator)
      .of_type(Playbook::Props::Numeric)
  }

  it {
    is_expected.to define_enum_prop(:color_option)
      .with_default("yellow")
      .with_values("yellow", "primary", "subtle")
  }

  it {
    is_expected.to define_enum_prop(:background_type)
      .with_default("fill")
      .with_values("fill", "outline")
  }

  it {
    is_expected.to define_enum_prop(:layout_option)
      .with_default("default")
      .with_values("default", "onestar", "number")
  }

  it {
    is_expected.to define_enum_prop(:size)
      .with_default("sm")
      .with_values("xs", "sm", "md", "lg")
  }

  it {
    is_expected.to define_enum_prop(:variant)
      .with_default("display")
      .with_values("display", "interactive")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_star_rating_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_star_rating_kit additional_class"
    end
  end

  describe "star limits" do
    it "caps an oversized denominator", :aggregate_failures do
      kit = subject.new(rating: 3, denominator: 1_000_000_000)

      expect(kit.star_denominator).to eq 10
      expect(kit.star_count).to eq 3
      expect(kit.empty_stars).to eq 7
    end

    it "treats a rating above the denominator as full", :aggregate_failures do
      kit = subject.new(rating: 100, denominator: 5)

      expect(kit.star_count).to eq 5
      expect(kit.empty_stars).to eq 0
      expect(kit.one_decimal_rating).to eq 5.0
    end

    it "keeps existing behavior for valid ratings", :aggregate_failures do
      kit = subject.new(rating: 4.2, denominator: 5)

      expect(kit.star_count).to eq 4
      expect(kit.empty_stars).to eq 1
      expect(kit.one_decimal_rating).to eq 4.2
    end

    it "rejects negative and non-finite values", :aggregate_failures do
      [-1, -0.5, Float::NAN, Float::INFINITY, -Float::INFINITY].each do |value|
        expect { subject.new(rating: value) }.to raise_error(Playbook::Props::Error)
        expect { subject.new(denominator: value) }.to raise_error(Playbook::Props::Error)
      end
    end
  end
end
