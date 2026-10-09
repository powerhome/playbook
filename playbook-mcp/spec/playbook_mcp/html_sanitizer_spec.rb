# frozen_string_literal: true

require "spec_helper"

RSpec.describe PlaybookMcp::HtmlSanitizer do
  it "allows table markup" do
    html = "<table><thead><tr><th>A</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>"
    expect(described_class.sanitize(html)).to include("<th>A</th>", "<td>1</td>")
  end

  it "strips script tags and event handlers" do
    dirty = %(<td onclick="alert(1)">x</td><script>alert(2)</script><img src=x onerror=alert(3)>)
    clean = described_class.sanitize(dirty)
    expect(clean).not_to include("script")
    expect(clean).not_to include("onclick")
    expect(clean).not_to include("onerror")
  end

  it "only allows children on composition kits" do
    expect(described_class.children_allowed?("table")).to be(true)
    expect(described_class.children_allowed?("button")).to be(false)
  end
end
