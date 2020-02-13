# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_highlight/highlight"

RSpec.describe Playbook::PbHighlight::Highlight do
  subject { Playbook::PbHighlight::Highlight }

  it { is_expected.to define_partial }
  describe "#classname" do
   it "returns namespaced class name", :aggregate_failures do
     expect(subject.new({}).classname).to eq "pb_highlight_kit"
   end
 end
end
