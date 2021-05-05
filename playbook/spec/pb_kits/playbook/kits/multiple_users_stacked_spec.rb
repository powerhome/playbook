# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_multiple_users_stacked/multiple_users_stacked"

RSpec.describe Playbook::PbMultipleUsersStacked::MultipleUsersStacked do
  subject { Playbook::PbMultipleUsersStacked::MultipleUsersStacked }

  it {
    is_expected.to define_prop(:users)
      .of_type(Playbook::Props::HashArray)
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new(users: []).classname).to eq "pb_multiple_users_stacked_kit"
      expect(subject.new(users: [], classname: "additional_class").classname).to eq "pb_multiple_users_stacked_kit additional_class"
      expect(subject.new(users: [], dark: true).classname).to eq "pb_multiple_users_stacked_kit dark"
    end
  end

  it "raises an error when not given users" do
    expect { subject.new({}) }.to raise_error(Playbook::Props::Error)
  end
end
