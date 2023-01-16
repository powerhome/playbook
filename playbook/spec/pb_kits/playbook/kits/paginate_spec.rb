# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_paginate/paginate"

RSpec.describe Playbook::PbPaginate::Paginate do
  subject { Playbook::PbPaginate::Paginate }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
