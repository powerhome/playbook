# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_file_upload/file_upload"

RSpec.describe Playbook::PbFileUpload::FileUpload do
  subject { Playbook::PbFileUpload::FileUpload }

  it { is_expected.to define_prop(:accept).of_type(Playbook::Props::String).with_default("") }
  it { is_expected.to define_prop(:files).of_type(Playbook::Props::Array).with_default([]) }
  it { is_expected.to define_prop(:label).of_type(Playbook::Props::String).with_default("Upload File") }
  it { is_expected.to define_prop(:placeholder).of_type(Playbook::Props::String).with_default("No file") }
  it { is_expected.to define_prop(:full_width).of_type(Playbook::Props::Boolean).with_default(false) }
  it { is_expected.to define_prop(:input_options).of_type(Playbook::Props::Hash).with_default({}) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_file_upload_kit"
      expect(subject.new(full_width: true).classname).to eq "pb_file_upload_kit full_width"
      expect(subject.new(full_width: false).classname).to eq "pb_file_upload_kit"
    end
  end

  describe "#full_width_class" do
    it "returns ' full_width' if full_width prop is true", :aggregate_failures do
      expect(subject.new(full_width: true).full_width_class).to eq " full_width"
    end

    it "returns '' if full_width prop is false", :aggregate_failures do
      expect(subject.new(full_width: false).full_width_class).to eq ""
    end
  end
end
