# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_person_contact/person_contact"

RSpec.describe Playbook::PbPersonContact::PersonContact do
  subject { Playbook::PbPersonContact::PersonContact }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:people)
                      .of_type(Playbook::Props::HashArray) }
  it { is_expected.to define_prop(:contacts)
                      .of_type(Playbook::Props::HashArray) }
end
