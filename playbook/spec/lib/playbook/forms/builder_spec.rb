# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, type: :kit do
  before do
    helper.extend Playbook::PbKitHelper
    helper.define_singleton_method :users_path do |*|
      "/users"
    end
  end

  it { expect(described_class).to be < ::ActionView::Helpers::FormBuilder }

  it "defines Playbook field helpers" do
    %i[
      actions
      check_box
      collection_select
      date_picker
      dropdown_field
      intl_telephone
      multi_level_select
      phone_number_field
      select
      star_rating_field
      text_area
      text_field
      time_picker
      time_zone_select_field
      typeahead
    ].each do |method_name|
      expect(described_class.method_defined?(method_name)).to be(true)
    end
  end

  it "allows the user to set the URL" do
    rendered = helper.pb_rails "form", props: { options: { url: "http://example.org" } }

    expect(rendered).to have_tag("form[action='http://example.org']")
  end

  it "allows the user to not set the URL" do
    model_name = double(name: "User", route_key: :users, param_key: :id)
    model = double("model", model_name: model_name, persisted?: false)
    object = double("object", to_model: model)
    rendered = helper.pb_rails "form", props: { options: { model: object } }

    expect(rendered).to have_tag("form[action='/users']")
  end

  it "handles nil model without deprecation warning" do
    rendered = helper.pb_rails "form", props: { options: { model: nil, url: "/users" } }

    expect(rendered).to have_tag("form[action='/users']")
  end

  it "allows the user to set the URL" do
    rendered = helper.pb_rails "form", props: { options: { url: "http://example.org" } }

    expect(rendered).to have_tag("form.pb-form")
  end

  it "allows the user render actions" do
    rendered = helper.pb_rails "form", props: { options: { url: "http://example.org" } } do |form|
      form.actions(&:submit)
    end

    expect(rendered).to have_tag("form > ol.pb-form-actions > li > button.pb_button_kit.pb_button_primary.pb_button_inline.pb_button_enabled[type=submit]")
  end
end
