# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_image/image"

RSpec.describe Playbook::PbImage::Image do
  subject { Playbook::PbImage::Image }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:alt) }
  it { is_expected.to define_prop(:url) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_image_kit blur_up"
    end
  end
end
