# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_pagination/pagination"

RSpec.describe Playbook::PbPagination::Pagination do
  subject { Playbook::PbPagination::Pagination }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
