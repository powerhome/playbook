# frozen_string_literal: true

require "yaml"

yaml_file_path = File.expand_path("../../../playbook/playbook-website/config/menu.yml", __dir__)

RSpec.describe "Menu YAML File" do
  let(:data) { YAML.safe_load(File.read(yaml_file_path), aliases: true) }

  it "should load YAML file without errors" do
    expect(data).to_not be_nil
  end

  it "should have categories defined" do
    expect(data).to have_key("kits")
    expect(data["kits"]).to be_an(Array)
    expect(data["kits"]).to_not be_empty
  end

  it "should have components defined for each category" do
    data["kits"].each do |kit|
      expect(kit).to have_key("category")
      expect(kit["category"]).to be_a(String)
      expect(kit).to have_key("components")
      expect(kit["components"]).to be_an(Array)
      expect(kit["components"]).to_not be_empty

      kit["components"].each do |component|
        expect(component).to have_key("name")
        expect(component["name"]).to be_a(String)
        expect(component).to have_key("platforms")
        expect(component["platforms"]).to be_an(Array)
        expect(component["platforms"]).to_not be_empty
      end
    end
  end
end
