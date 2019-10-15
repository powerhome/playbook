# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_loading_inline/loading_inline"

RSpec.describe Playbook::PbLoadingInline::LoadingInline do
  subject { Playbook::LoadingInline::LoadingInline }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:align)
                  .with_default("left")
                  .with_values("left", "center", "right") }
  it { is_expected.to define_enum_prop(:dark) }
 describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_loading_inline_left"
    end
  end
end
