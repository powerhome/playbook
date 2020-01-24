# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_highlight/highlight"

RSpec.describe Playbook::PbHighlight::Highlight do
  subject { Playbook::PbHighlight::Highlight }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
