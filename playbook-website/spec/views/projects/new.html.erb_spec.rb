# frozen_string_literal: true

require "rails_helper"

RSpec.describe "projects/new", type: :view do
  before(:each) do
    assign(:project, Project.new(
                       :summary => "MyText"
                     ))
  end

  it "renders new project form" do
    render

    assert_select "form[action=?][method=?]", projects_path, "post" do
      assert_select "textarea[name=?]", "project[summary]"
    end
  end
end
