# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_table/table"

RSpec.describe Playbook::PbTable::Table do
  subject { Playbook::PbTable::Table }

  it { is_expected.to define_partial }

  it { is_expected.to define_enum_prop(:size)
                      .with_default("md")
                      .with_values("sm", "md", "lg") }
  it { is_expected.to define_boolean_prop(:single_line).with_default(false) }
  it { is_expected.to define_boolean_prop(:dark).with_default(false) }
  it { is_expected.to define_boolean_prop(:disable_hover).with_default(false) }
  it { is_expected.to define_boolean_prop(:container).with_default(false) }
  it { is_expected.to define_prop(:text) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_table table-md"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_table table-md additional_class"
    end
  end
end
