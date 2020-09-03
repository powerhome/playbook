# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_picker/date_picker"

RSpec.describe Playbook::PbDatePicker::DatePicker do
  subject { Playbook::PbDatePicker::DatePicker }

  it { is_expected.to define_partial }

  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_prop(:default_date).with_default("") }
  it { is_expected.to define_prop(:disable_date).of_type(Playbook::Props::Array).with_default([]) }
  it { is_expected.to define_boolean_prop(:disable_input).with_default(false) }
  it { is_expected.to define_prop(:disable_range).of_type(Playbook::Props::Array).with_default([]) }
  it { is_expected.to define_prop(:disable_weekdays).of_type(Playbook::Props::Array).with_default([]) }
  it { is_expected.to define_prop(:error).of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:format).of_type(Playbook::Props::String).with_default("m/d/Y") }
  it { is_expected.to define_boolean_prop(:hide_icon).with_default(false) }
  it { is_expected.to define_boolean_prop(:hide_label).with_default(false) }
  it { is_expected.to define_prop(:label).of_type(Playbook::Props::String).with_default("Date Picker") }
  it { is_expected.to define_prop(:input_aria).of_type(Playbook::Props::Hash).with_default({}) }
  it { is_expected.to define_prop(:input_data).of_type(Playbook::Props::Hash).with_default({}) }
  it { is_expected.to define_prop(:max_date).of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:min_date).of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:name).of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:mode).of_type(Playbook::Props::String).with_default("single") }
  it { is_expected.to define_prop(:picker_id).of_type(Playbook::Props::String).that_is_required }
  it { is_expected.to define_prop(:placeholder).of_type(Playbook::Props::String) }
  it { is_expected.to define_boolean_prop(:read_only).with_default(false) }
  it { is_expected.to define_boolean_prop(:required).with_default(false) }
  it { is_expected.to define_prop(:type).of_type(Playbook::Props::String) }
  it { is_expected.to define_prop(:year_range).of_type(Playbook::Props::Array).with_default([1900, 2100]) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({ picker_id: "spec-test" }).classname).to eq "pb_date_picker_kit"
      expect(subject.new({ classname: "additional_class", picker_id: "spec-test" }).classname).to eq "pb_date_picker_kit additional_class"
      expect(subject.new({ classname: "dark", picker_id: "spec-test" }).classname).to eq "pb_date_picker_kit dark"
    end
  end

  it "raises an error when not given a picker_id" do
    expect { subject.new{} }.to raise_error(Playbook::Props::Error)
  end
end
