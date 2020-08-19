# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_background/background"

RSpec.describe Playbook::PbBackground::Background do
  subject { Playbook::PbBackground::Background }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
