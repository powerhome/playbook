# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_range_inline/date_range_inline"

RSpec.describe Playbook::PbDateRangeInline::DateRangeInline do
  subject { Playbook::PbDateRangeInline::DateRangeInline }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:start_date).of_type(Playbook::Props::Date)
                                              .that_is_required }
  it { is_expected.to define_prop(:end_date).of_type(Playbook::Props::Date)
                                              .that_is_required }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      required_props = { start_date: Date.today, end_date: Date.tomorrow }
      expect(subject.new(required_props).classname).to eq "pb_date_range_inline_kit"
      expect(subject.new(required_props.merge(classname: "additional_class")).classname).to eq "pb_date_range_inline_kit additional_class"
    end
  end
end
