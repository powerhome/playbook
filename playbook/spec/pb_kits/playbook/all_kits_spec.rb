# frozen_string_literal: true

require "pathname"
require "yaml"
require "rails"

RSpec.describe "All our Kits that are React Components" do
  it "should have a const classes that ends with className" do
    kits_path = if Rails.env.development?
                  "#{Dir.pwd}/playbook/app/pb_kits/playbook"
                else
                  "#{Dir.pwd}/app/pb_kits/playbook"
                end
    all_kits = []

    Pathname.new(kits_path).children.select(&:directory?).each do |kit|
      all_kits.push(kit.to_s.split("#{kits_path}/pb_"))
    end

    all_kits.each do |kit|
      path = Pathname.new("#{kits_path}/pb_#{kit}/_#{kit}.tsx")
      path = Pathname.new("#{kits_path}/pb_#{kit}/_#{kit}.jsx") unless File.exist?(path)
      next unless File.exist?(path)

      file = File.open(path, "r:UTF-8", &:read)

      expect(file.include?("className)")).to be_truthy if file.include?("constclasses=classnames(")
    end
  end
end
