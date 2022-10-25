# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_pagination/pagination"

RSpec.describe Playbook::PbPagination::Pagination do
  subject { Playbook::PbPagination::Pagination }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_pagination"
    end
  end
end
