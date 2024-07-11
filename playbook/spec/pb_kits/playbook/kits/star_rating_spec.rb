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
end
