# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_person/person"

RSpec.describe Playbook::PbPerson::Person do
  subject { Playbook::PbPerson::Person }

  it { is_expected.to define_partial }
end
