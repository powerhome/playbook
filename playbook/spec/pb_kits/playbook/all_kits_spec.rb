# frozen_string_literal: true

require "pathname"

describe "All our Kits that are React Components" do
  it "should have a const classes that ends with className" do
    path = Pathname.new("../app/pb_kits/playbook/pb_avatar/_avatar.tsx").read.gsub(/\s+/, "")

    expect(path.include?("className)")).to be_truthy if path.include?("constclasses=classnames(")
  end
end
