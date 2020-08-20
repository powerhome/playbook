# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date/date"

RSpec.describe Playbook::PbDate::Date do
  subject { Playbook::PbDate::Date }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:date)
                      .that_is_required }
  it { is_expected.to define_boolean_prop(:show_icon)
                      .with_default(false) }
  it { is_expected.to define_boolean_prop(:show_day_of_week)
                      .with_default(false) }
  it { is_expected.to define_enum_prop(:alignment)
                      .with_values("left", "center", "right")
                      .with_default("left") }
  
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      required_props = { date: Date.today }

      expect(subject.new(required_props).classname).to eq "pb_date_kit_left"
      expect(subject.new(required_props.merge(alignment: "center")).classname).to eq "pb_date_kit_center"
      expect(subject.new(required_props.merge(alignment: "right")).classname).to eq "pb_date_kit_right"
      expect(subject.new(required_props.merge(classname: "additional_class")).classname).to eq "pb_date_kit_left additional_class"
    end
  end
end
