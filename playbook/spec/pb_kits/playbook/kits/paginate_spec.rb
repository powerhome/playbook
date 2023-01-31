# frozen_string_literal: true

require "will_paginate"
require "playbook/pagination_renderer"
require_relative "../../../../app/pb_kits/playbook/pb_pagination/pagination"

RSpec.describe Playbook::PbPagination::Pagination do
  subject { Playbook::PbPagination::Pagination }

  it { is_expected.to define_prop(:model) }
  it { is_expected.to define_prop(:view) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_paginate"
    end
  end
end
