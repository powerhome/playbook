# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_time_stacked/date_time_stacked"

RSpec.describe Playbook::PbDateTimeStacked::DateTimeStacked do
  subject { Playbook::PbDateTimeStacked::DateTimeStacked }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:dark)
                      .of_type(Playbook::Props::Boolean)
                      .with_default(false) }
  it { is_expected.to define_prop(:date)
                      .of_type(Playbook::Props::Date) }
end
