# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_range_inline/date_range_inline"

RSpec.describe Playbook::PbDateRangeInline::DateRangeInline do
  subject { Playbook::PbDateRangeInline::DateRangeInline }

  it {
    is_expected.to define_prop(:start_date).of_type(Playbook::Props::Date)
                                           .that_is_required
  }
  it {
    is_expected.to define_prop(:end_date).of_type(Playbook::Props::Date)
                                         .that_is_required
  }

  it { is_expected.to define_prop(:dark).with_default(false) }
  it { is_expected.to define_prop(:icon).with_default(false) }
  it { is_expected.to define_prop(:show_current_year).with_default(false) }

  it do
    is_expected.to define_enum_prop(:align)
      .with_default("left")
      .with_values("left", "center", "right")
  end

  it do
    is_expected.to define_enum_prop(:size)
      .with_default("sm")
      .with_values("sm", "xs")
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      required_props = { start_date: Date.today, end_date: Date.tomorrow }
      expect(subject.new(required_props).classname).to eq "pb_date_range_inline_kit_left"
      expect(subject.new(required_props.merge(classname: "additional_class")).classname).to eq "pb_date_range_inline_kit_left additional_class"
    end
  end
end
