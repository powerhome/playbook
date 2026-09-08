# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playbook::Forms::Builder, "#collection_select", type: :helper do
  include_context "playbook form builder"

  let(:collection) do
    [
      OpenStruct.new(id: 1, name: "Alpha"),
      OpenStruct.new(id: 2, name: "Beta"),
    ]
  end

  it "renders a select kit wrapping a collection select" do
    rendered = render_form do |builder|
      concat builder.collection_select(:category_id, collection, :id, :name)
    end

    expect(rendered).to have_tag("form .pb_select select[name='example[category_id]']")
    expect(rendered).to have_tag("option[value='1']", text: "Alpha")
    expect(rendered).to have_tag("option[value='2']", text: "Beta")
  end

  it "humanizes the label when label is true" do
    rendered = render_form do |builder|
      concat builder.collection_select(:category_id, collection, :id, :name, props: { label: true })
    end

    expect(rendered).to have_tag("form .pb_select label", text: /Category/)
  end

  it "uses a blank selection prompt and required attribute" do
    rendered = render_form do |builder|
      concat builder.collection_select(
        :category_id,
        collection,
        :id,
        :name,
        props: { blank_selection: "Choose one", required: true, validation_message: "Pick a category" }
      )
    end

    expect(rendered).to have_tag("select[name='example[category_id]'][required][data-message='Pick a category']")
    expect(rendered).to have_tag("option", text: "Choose one")
  end

  it "uses a custom input id from input_options" do
    rendered = render_form do |builder|
      concat builder.collection_select(
        :category_id,
        collection,
        :id,
        :name,
        props: { input_options: { id: "custom-category" } }
      )
    end

    expect(rendered).to have_tag("select#custom-category")
  end
end
