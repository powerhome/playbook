# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_home_address_street/home_address_street"

RSpec.describe Playbook::PbHomeAddressStreet::HomeAddressStreet do
  subject { Playbook::PbHomeAddressStreet::HomeAddressStreet }

  it { is_expected.to define_prop(:address) }
  it { is_expected.to define_prop(:city) }
  it { is_expected.to define_prop(:emphasis) }
  it {
    is_expected.to define_prop(:home_id)
      .of_type(Playbook::Props::Number)
  }
  it { is_expected.to define_prop(:home_url) }
  it { is_expected.to define_prop(:house_style) }
  it { is_expected.to define_prop(:state) }
  it { is_expected.to define_prop(:zipcode) }
  it { is_expected.to define_boolean_prop(:dark) }
  it {
    is_expected.to define_boolean_prop(:new_window)
      .with_default(false)
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_home_address_street_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_home_address_street_kit additional_class"
    end
  end

  describe "#window_target" do
    it "should allow links to open in a new window", :aggregate_failures do
      expect(subject.new({}).target_option).to eq "_self"
      expect(subject.new(home_url: "Google.com", target: "_blank").target_option).to eq "_blank"
    end
  end
end
