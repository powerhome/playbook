# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_picker/date_picker"

RSpec.describe Playbook::PbDatePicker::DatePicker do
  subject { Playbook::PbDatePicker::DatePicker }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
