# frozen_string_literal: true

require "will_paginate"
require "playbook/pagination_renderer"
require_relative "../../../../app/pb_kits/playbook/pb_paginate/paginate"

RSpec.describe Playbook::PbPaginate::Paginate do
  subject { Playbook::PbPaginate::Paginate }

  it { is_expected.to define_prop(:model) }
end
