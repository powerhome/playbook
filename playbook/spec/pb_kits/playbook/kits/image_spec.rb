# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_image/image"

RSpec.describe Playbook::PbImage::Image do
  subject { Playbook::PbImage::Image }

  it { is_expected.to define_prop(:alt) }
  it { is_expected.to define_prop(:url) }
  it { is_expected.to define_prop(:size) }
  it { is_expected.to define_prop(:on_error) }
  it { is_expected.to define_boolean_prop(:rounded).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_image_kit lazyload blur_up"
      expect(subject.new({size: "xs"}).classname).to eq "pb_image_kit_xs lazyload blur_up"
      expect(subject.new({rounded:true}).classname).to eq "pb_image_kit lazyload blur_up rounded"
    end
  end
end
