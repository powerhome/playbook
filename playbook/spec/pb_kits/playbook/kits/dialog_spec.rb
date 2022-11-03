# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_dialog/dialog"

RSpec.describe Playbook::PbDialog::Dialog do
  subject { Playbook::PbDialog::Dialog }

  it {
    is_expected.to define_enum_prop(:size)
      .with_values("sm", "md", "lg", "xl", "status_size", "content")
      .with_default("md")
  }
  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_dialog pb_dialog_md"
      expect(subject.new(size: "sm").classname).to eq "pb_dialog pb_dialog_sm"
    end
  end
end
