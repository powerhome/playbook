# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_star_rating/star_rating"

RSpec.describe Playbook::PbStarRating::StarRating do
  subject { Playbook::PbStarRating::StarRating }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:rating)
                  .of_type(Playbook::Props::Numeric) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_star_rating_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_star_rating_kit additional_class"
    end
  end
end
