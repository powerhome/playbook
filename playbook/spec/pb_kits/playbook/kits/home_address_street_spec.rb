# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_home_address_street/home_address_street"

RSpec.describe Playbook::PbHomeAddressStreet::HomeAddressStreet do
  subject { Playbook::PbHomeAddressStreet::HomeAddressStreet }
  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:address) }
  it { is_expected.to define_prop(:city) }
  it { is_expected.to define_prop(:emphasis) }
  it { is_expected.to define_prop(:home_id)
                      .of_type(Playbook::Props::Number) }
  it { is_expected.to define_prop(:home_url) }
  it { is_expected.to define_prop(:house_style) }
  it { is_expected.to define_prop(:state) }
  it { is_expected.to define_prop(:zipcode) }
  it { is_expected.to define_boolean_prop(:dark) }


  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_home_address_street_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_home_address_street_kit additional_class"
    end
  end
end
