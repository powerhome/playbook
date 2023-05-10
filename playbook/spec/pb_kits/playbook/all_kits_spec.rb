# frozen_string_literal: true

require "pathname"
require "yaml"
require "rails"

RSpec.describe "All our Kits that are React Components" do
  kits_path = if Rails.env.development?
                "../playbook/playbook/app/pb_kits/playbook"
              else
                "#{Dir.pwd}/app/pb_kits/playbook"
              end
  all_kits = []

  Pathname.new(kits_path).children.select(&:directory?).each do |kit|
    all_kits.push(kit.to_s.split("#{kits_path}/pb_"))
  end

  all_kits.each do |kit|
    kit = kit[1]
    it "_#{kit} should have a const classes that ends with className" do
      path = Pathname.new("#{kits_path}/pb_#{kit}/_#{kit}.tsx")
      path = Pathname.new("#{kits_path}/pb_#{kit}/_#{kit}.jsx") unless File.exist?(path)
      next unless File.exist?(path)

      file = File.open(path, "r:UTF-8", &:read)
      file = file.gsub(/\s+/, "")

      if file.include?("constclasses=classnames(")
        after_class_delcaration = file.split("constclasses=classnames(")
        expect(after_class_delcaration[1].include?("className)")).to eq true
      end
    end
  end
end
