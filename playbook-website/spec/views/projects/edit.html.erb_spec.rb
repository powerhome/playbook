# frozen_string_literal: true

require "rails_helper"

RSpec.describe "projects/edit", type: :view do
  before(:each) do
    @project = assign(:project, Project.create!(
                                  :summary => "MyText"
                                ))
  end

  it "renders the edit project form" do
    render

    assert_select "form[action=?][method=?]", project_path(@project), "post" do
      assert_select "textarea[name=?]", "project[summary]"
    end
  end
end
