# frozen_string_literal: true

require "pathname"
require "yaml"

describe "All our Kits that are React Components" do
  it "should have a const classes that ends with className" do
    menu = YAML.load_file(Pathname.new("../../playbook-website/config/menu.yml"))
    all_kits = []
    menu["kits"].each do |kit|
      if kit.is_a? Hash
        kit.values[0].each do |sub_kit|
          all_kits.push(sub_kit)
        end
      else
        all_kits.push(kit)
      end
    end

    all_kits.each do |kit|
      path = Pathname.new("../app/pb_kits/playbook/pb_#{kit}/_#{kit}.tsx")
      if File.exist?(path)
        file = File.open(Pathname.new("../app/pb_kits/playbook/pb_#{kit}/_#{kit}.tsx"), "r:UTF-8", &:read)
        expect(file.include?("className)")).to be_truthy if file.include?("constclasses=classnames(")
      end
    end
  end
end
