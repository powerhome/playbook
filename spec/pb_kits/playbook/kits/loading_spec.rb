# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_loading/loading"

RSpec.describe Playbook::PbLoading::Loading do
  subject { Playbook::PbLoading::Loading }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
