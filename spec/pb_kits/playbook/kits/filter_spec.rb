# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_filter/filter"

RSpec.describe Playbook::PbFilter::Filter do
  subject { Playbook::PbFilter::Filter }
  
  it { is_expected.to define_prop(:filters)
                      .of_type(Playbook::Props::HashArray) }
  it { is_expected.to define_prop(:sort_menu)
                      .of_type(Playbook::Props::HashArray) }
  it { is_expected.to define_prop(:results)
                      .of_type(Playbook::Props::Numeric) }
  it { is_expected.to define_enum_prop(:template)
                      .with_default("default")
                      .with_values("default", "single") }

  it { is_expected.to define_partial }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_filter_kit"
    end
  end
end
