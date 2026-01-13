# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_dialog/dialog"

RSpec.describe Playbook::PbDialog::Dialog do
  subject { Playbook::PbDialog::Dialog }

  it {
    is_expected.to define_enum_prop(:size)
      .with_values("sm", "md", "lg", "xl", "status_size", "content")
      .with_default("md")
  }

  it {
    is_expected.to define_enum_prop(:placement)
      .with_values("left", "right", "center")
      .with_default("center")
  }

  it { is_expected.to define_prop(:closeable).with_default(true) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_dialog pb_dialog_rails pb_dialog_md_center"
      expect(subject.new(size: "sm").classname).to eq "pb_dialog pb_dialog_rails pb_dialog_sm_center"
      expect(subject.new(placement: "right").classname).to eq "pb_dialog pb_dialog_rails pb_dialog_md_right"
    end
  end
end
