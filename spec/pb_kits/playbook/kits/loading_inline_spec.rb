# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_loading_inline/loading_inline"

RSpec.describe Playbook::PbLoadingInline::LoadingInline do
  subject { Playbook::PbLoadingInline::LoadingInline }

  it { is_expected.to define_partial }
  it { is_expected.to define_boolean_prop(:dark) }
  it { is_expected.to define_enum_prop(:align)
                  .with_default("left")
                  .with_values("left", "center", "right") }
 describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_loading_inline_kit_left"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_loading_inline_kit_left additional_class"
    end
  end
end
