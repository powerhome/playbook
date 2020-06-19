# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_installer/installer"

RSpec.describe Playbook::PbInstaller::Installer do
  subject { Playbook::PbInstaller::Installer }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:link)}
  it { is_expected.to define_prop(:project_name)}

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_installer_kit"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_installer_kit additional_class"
    end
  end
end
