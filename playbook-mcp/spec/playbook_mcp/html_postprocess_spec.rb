# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::HtmlPostprocess do
  it "strips XML declarations from inlined SVGs" do
    html = %(<div><?xml version="1.0"?>\n<svg xmlns="http://www.w3.org/2000/svg"></svg></div>)
    expect(described_class.clean(html)).to eq(%(<div><svg xmlns="http://www.w3.org/2000/svg"></svg></div>))
  end
end
