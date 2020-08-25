# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_collapsible/collapsible"

RSpec.describe Playbook::PbCollapsible::Collapsible do
  subject { Playbook::PbCollapsible::Collapsible }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
