# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_multiple_users/multiple_users"

RSpec.describe Playbook::PbMultipleUsers::MultipleUsers do
  subject { Playbook::PbMultipleUsers::MultipleUsers }

  it {
    is_expected.to define_boolean_prop(:reverse)
      .with_default(false)
  }
  it {
    is_expected.to define_prop(:users)
      .of_type(Playbook::Props::HashArray)
  }
  it {
    is_expected.to define_boolean_prop(:with_tooltip)
      .with_default(false)
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new(users: []).classname).to eq "pb_multiple_users_kit"
      expect(subject.new(users: [], classname: "additional_class").classname).to eq "pb_multiple_users_kit additional_class"
      expect(subject.new(users: [], reverse: true).classname).to eq "pb_multiple_users_kit_reverse"
      expect(subject.new(users: [], reverse: true, dark: true).classname).to eq "pb_multiple_users_kit_reverse dark"
    end
  end

  it "raises an error when not given users" do
    expect { subject.new({}) }.to raise_error(Playbook::Props::Error)
  end
end
