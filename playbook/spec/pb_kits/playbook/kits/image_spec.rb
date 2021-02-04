# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_image/image"
require 'axe-rspec'
require 'selenium-webdriver'

RSpec.describe Playbook::PbImage::Image do
  subject { Playbook::PbImage::Image }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:alt) }
  it { is_expected.to define_prop(:url) }
  it { is_expected.to define_prop(:size) }
  it { is_expected.to define_prop(:on_error) }
  it { is_expected.to define_boolean_prop(:rounded).with_default(false) }

  #TODO: abstract away to helper method
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  page = Selenium::WebDriver.for :chrome, options: options

  page.navigate.to 'http://localhost:8089/kits/image/rails' #TODO: abstract to helper method using kit name

  describe "accessibility" do
    it "is accessible" do
      expect(page).to be_axe_clean.within('.pb--kit-example').excluding('^=pb_caption_kit:first-child') #TODO: abstract the exclusion away - it is global
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_image_kit lazyload blur_up"
      expect(subject.new({size: "xs"}).classname).to eq "pb_image_kit lazyload blur_up_xs"
      expect(subject.new({rounded:true}).classname).to eq "pb_image_kit lazyload blur_up rounded"
    end
  end
end
