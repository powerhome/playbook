# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder::ActionArea, type: :helper do
  include_context "playbook form builder"

  subject(:action_area) { described_class.new(helper, "Create Example") }

  describe "#submit" do
    it "renders a submit button in a list item with the default value" do
      expect(action_area.submit).to have_tag("li > button.pb_button_kit[type=submit]", text: /Create Example/)
    end

    it "uses an explicit value and props" do
      html = action_area.submit("Save changes", props: { variant: "secondary" })

      expect(html).to have_tag("li > button.pb_button_kit.pb_button_secondary[type=submit]", text: /Save changes/)
    end
  end

  describe "#button" do
    it "renders a button kit inside a list item" do
      html = action_area.button(props: { text: "Cancel", type: "button" })

      expect(html).to have_tag("li > button.pb_button_kit[type=button]", text: /Cancel/)
    end
  end
end
